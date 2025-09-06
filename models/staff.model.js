module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define("staff", {
    employee_id:{
      type:DataTypes.STRING,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    designation:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qualification:{
      type: DataTypes.STRING,
      allowNull: true
    },
    work_exp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    father_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    mother_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_no:{
      type: DataTypes.STRING,
      allowNull: false
    },
    emergency_contact_no:{
      type: DataTypes.STRING,
      allowNull: true
    },
    dob:{
      type: DataTypes.DATE,
      allowNull: false
    },
    marital_status:{
      type: DataTypes.STRING,
      allowNull: true
    },
    date_of_joining:{
      type: DataTypes.DATE,
      allowNull: true
    },
    local_address:{
      type: DataTypes.STRING,
      allowNull: false
    },
    permanent_address:{
      type: DataTypes.STRING,
      allowNull: false
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false
    },
    note:{
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook:{
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter:{
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin:{
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram:{
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_basic_filled :{
      type: DataTypes.BOOLEAN,
    },
    is_personal_filled :{
      type: DataTypes.BOOLEAN,
    },
    is_social_filled :{
      type: DataTypes.BOOLEAN,
    },
    temp_password_expiry:{
      type: DataTypes.DATE,
      allowNull: true
    },
     date_of_leaving:{
      type: DataTypes.DATE,
      allowNull: true
    },
     account_title:{
      type: DataTypes.STRING,
      allowNull: true
    },
     bank_account_no:{
      type: DataTypes.STRING,
      allowNull: true
    },
     bank_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
     ifsc_code:{
      type: DataTypes.STRING,
      allowNull: true
    },
     bank_branch:{
      type: DataTypes.STRING,
      allowNull: true
    },
     payscale:{
      type: DataTypes.STRING,
      allowNull: true
    },
     basic_salary:{
      type: DataTypes.STRING,
      allowNull: true
    },
     epf_no:{
      type: DataTypes.STRING,
      allowNull: true
    },
     in_time:{
      type: DataTypes.DATE,
      allowNull: true
    },
    out_time:{
      type: DataTypes.DATE,
      allowNull: true
    },
    esi:{
      type: DataTypes.STRING,
      allowNull: true
    },
    sf:{
      type: DataTypes.STRING,
      allowNull: true
    },
    contract_type:{
      type: DataTypes.STRING,
      allowNull: true
    },
     shift:{
      type: DataTypes.STRING,
      allowNull: true
    },
     resume:{
      type: DataTypes.STRING,
      allowNull: true
    },
     joining_letter:{
      type: DataTypes.STRING,
      allowNull: true
    },
     resignation_letter:{
      type: DataTypes.STRING,
      allowNull: true
    },
     other_document_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
     other_document_file:{
      type: DataTypes.STRING,
      allowNull: true
    },
     disable_at:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },


  }, {
    freezeTableName: true // ✅ disables pluralization, uses 'staff' not 'staffs'
  });

  return Staff;
};
