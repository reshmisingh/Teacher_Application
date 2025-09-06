const db = require("../models");
const Staff = db.staff;
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
require("dotenv").config();

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

//Register
exports.register = async (req, res) => {
  const {
    name, surname, email,father_name, mother_name, contact_no, emergency_contact_no, dob,
    gender,local_address,permanent_address
  } = req.body;

  try {
    const staffExist = await Staff.findOne({ where: { email } });
    if (staffExist) return res.status(400).json({ "statusCode": 400, message: "User already exists" });

    const rawPassword = crypto.randomBytes(5).toString("hex"); // e.g., 'a1b2c3d4e5'
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const lastStaff = await Staff.findOne({
      order: [['id', 'DESC']], // use auto-incremented id
      attributes: ['employee_id']
    });

    let employee_id = 'T9001';
    if (lastStaff && lastStaff.employee_id) {
      const lastId = lastStaff.employee_id;
      const num = parseInt(lastId.slice(1)) + 1;
      employee_id = `T${num}`;
    }

    const newStaff = await Staff.create({
      employee_id,
      name, surname, email, password: hashedPassword, father_name, mother_name, contact_no,
      emergency_contact_no, dob, gender, is_active: 1,local_address,permanent_address,is_basic_filled: true
    });

    // Prepare dynamic mail message
    const subject = "Your Staff Account Details";
    const message = `
Hello ${name},

Your staff account has been created successfully.

Login Details:
Email: ${email}
Password: ${rawPassword}

Please change your password after logging in.

Regards,
HR/Admin Team
    `;

    // Send email using helper
    res.status(201).json({
      statusCode: 201,
      message: "User registered and credentials sent via email",
      user: { id: newStaff.id, email: newStaff.email }
    });

    await sendMail({
      to: email,
      subject,
      text: message
    });

  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
      stack: err.stack
    });
  }
};

exports.savePersonalInfo = async (req, res) => {
  const {email, department, designation, qualification, date_of_joining, note, gender, work_exp } = req.body;
  
  try {
    const staff = await Staff.findOne({ where: { email } });
    if (!staff) return res.status(404).json({ statusCode: 401,message: "User not found" });
    
    await staff.update({
      department, designation, qualification, date_of_joining, note, gender, work_exp,
      is_personal_filled: true
    });

    return res.status(200).json({statusCode:"200", message: "Personal info saved", progress: "Personal info completed" });
  } catch (err) {
    res.status(500).json({statusCode:"500", message: "Failed to save personal info", error: err.message });
  }
};

exports.saveSocialInfo = async (req, res) => {
  const { id, facebook, twitter, linkedin, instagram } = req.body;

  try {
    const staff = await Staff.findOne({ where: { id } });
    if (!staff) return res.status(404).json({statusCode:"404", message: "User not found" });

    await staff.update({
      facebook, twitter, linkedin, instagram,
      is_social_filled: true
    });

    return res.status(200).json({statusCode:"200", message: "Social info saved", progress: "Social info completed" });
  } catch (err) {
    res.status(500).json({statusCode:"500", message: "Failed to save social info", error: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Staff.findOne({ where: { email } });
    
    if (!user) return res.status(404).json({ statusCode: 404,message: "Staff not found" });

    if (user.is_temp_password && new Date(user.temp_password_expiry) < new Date()) {
  return res.status(403).json({statusCode: 403,
    message: 'Temporary password has expired. Please request a new one.'
  });
}

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({statusCode:400, message: "Invalid password" });

    const token = generateToken(user);
    res.json({ "statusCode": 200, message: "Login successful", token,"data":user });
  } catch (err) {
    res.status(500).json({ "statusCode": 500, message: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Basic email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Please enter a valid email address'
    });
  }

  try {
    // Check if staff exists
    const staff = await Staff.findOne({ where: { email } });

    if (!staff) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Incorrect email'
      });
    }

    if (staff.is_active !== 1) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Your account is disabled. Please contact the administrator.'
      });
    }

    // Generate temporary password
    const tempPassword = crypto.randomBytes(4).toString('hex'); // 8 characters
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Set expiration time (24 hours from now)
    const tempPasswordExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // Save to DB
    await staff.update({
      password: hashedTempPassword,
      temp_password_expiry: tempPasswordExpiry, // Add this column in your DB
      is_temp_password: true // Add this boolean flag column
    });

    // Mail content
    const message = `
Hello ${staff.name},

We have reset your password as requested.

Your temporary password is: ${tempPassword}

This password is valid only for 24 hours. Please login and change your password immediately after logging in.

If you didn't request this change, please contact the administrator.

Regards,
Admin Team
`;
   // Send mail
   
     res.status(200).json({
      statusCode: 200,
      message: 'A temporary password has been sent to your email. It is valid for 24 hours.'
    });

     await sendMail({
      to: email,
      subject: 'Temporary Password - Valid for 24 Hours',
      text: message
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

