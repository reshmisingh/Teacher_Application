const db = require("../models");
const Staff = db.staff;
const bcrypt = require("bcryptjs");

// exports.findAll = async (req, res) => {
//   try {
//     const staff = await Staff.findAll();
//     res.send(staff);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

exports.findOne = async (req, res) => {
   try {
    const user = await Staff.findByPk(req.user.id); // ID from decoded token
    if (!user) return res.status(404).json({statusCode: 404, message: "User not found" });
    res.status(200).json({statusCode: 200,data:user});
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({statusCode:400, message: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({statusCode:400, message: 'New password and confirm password do not match' });
  }

  try {
    const staff = await Staff.findByPk(req.user.id); // User info from JWT middleware

    if (!staff) {
      return res.status(404).json({statusCode:404, message: 'Staff not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, staff.password);
    if (!isMatch) {
      return res.status(400).json({statusCode:400, message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await staff.update({ password: hashedPassword, is_temp_password: false, temp_password_expiry: null });

    return res.status(200).json({statusCode:200, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({statusCode:500, message: 'Internal server error' });
  }
};


exports.update = async (req, res) => {
  try {
    const id = req.params.id;

   const staff = await Staff.findByPk(id);
      if (!staff) {
        return res.status(404).send({ statusCode: 404, message: "Staff not found" });
      }

      // Build update data dynamically (ignore blank values)
      const updateData = {};
      for (let key in req.body) {
        if (req.body[key] !== "" && req.body[key] !== undefined) {
          updateData[key] = req.body[key];
        }
      }

      // If image is uploaded, update image field
      if (req.file) {
        updateData.image = req.file.filename;
      }

      // Update only with provided values
       await Staff.update(updateData, { where: { id } });

    res.send({
      statusCode: 200,
      message: "Staff updated successfully",
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    await Staff.destroy({ where: { id: req.params.id } });
    res.send({ message: "User deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
