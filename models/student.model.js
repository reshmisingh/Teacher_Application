module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    register:{
      type:DataTypes.STRING,
      allowNull:false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admission_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roll_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class:{
      type: DataTypes.STRING,
      allowNull: true
    },
    admission_date:{
      type: DataTypes.DATE,
      allowNull: true
    },
    firstname:{
      type: DataTypes.STRING,
      allowNull: true
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rte:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    mobileno:{
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
      type: DataTypes.DATE,
      allowNull: false
    },
    state:{
      type: DataTypes.STRING,
      allowNull: true
    },
    city:{
      type: DataTypes.DATE,
      allowNull: true
    },
    pincode:{
      type: DataTypes.STRING,
      allowNull: false
    },
    religion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    cast:{
      type: DataTypes.STRING,
      allowNull: false
    },
    dob:{
      type: DataTypes.STRING,
      allowNull: true
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: true
    },
    current_address:{
      type: DataTypes.STRING,
      allowNull: true
    },
    permanent_address:{
      type: DataTypes.STRING,
      allowNull: true
    },
    category_id:{
      type: DataTypes.STRING,
      allowNull: true
    },
    route_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    school_house_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blood_group :{
      type: DataTypes.STRING,
      allowNull: false
    },
    vehroute_id :{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specific_colony :{
      type: DataTypes.STRING,
      allowNull: true
    },
    hostel_room_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
     adhar_no:{
      type: DataTypes.STRING,
      allowNull: true
    },
     samagra_id:{
      type: DataTypes.STRING,
      allowNull: true
    },
     fsssm_id:{
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
     guardian_is:{
      type: DataTypes.STRING,
      allowNull: true
    },
     father_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
     father_phone:{
      type: DataTypes.STRING,
      allowNull: true
    },
     father_occupation:{
      type: DataTypes.DATE,
      allowNull: true
    },
    father_qualification:{
      type: DataTypes.DATE,
      allowNull: true
    },
    mother_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
    mother_phone:{
      type: DataTypes.STRING,
      allowNull: true
    },
    mother_occupation:{
      type: DataTypes.STRING,
      allowNull: true
    },
     mother_qualification:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_relation:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_phone:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_occupation:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_address:{
      type: DataTypes.STRING,
      allowNull: true
    },
     guardian_email:{
      type: DataTypes.STRING,
      allowNull: true
    },
    father_pic:{
      type: DataTypes.STRING,
      allowNull: true
    },
    mother_pic:{
      type: DataTypes.STRING,
      allowNull: true
    },
    guardian_pic:{
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active:{
      type: DataTypes.STRING,
      allowNull: true
    },
    previous_school:{
      type: DataTypes.STRING,
      allowNull: true
    },
    height:{
      type: DataTypes.STRING,
      allowNull: true
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: true
    },
    measurement_date:{
      type: DataTypes.DATE,
      allowNull: true
    },
    dis_reason:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note:{
      type: DataTypes.STRING,
      allowNull: true
    },
    dis_note:{
      type: DataTypes.STRING,
      allowNull: true
    },
    app_key:{
      type: DataTypes.STRING,
      allowNull: true
    },
    parent_app_key:{
      type: DataTypes.STRING,
      allowNull: true
    },
    disable_at:{
      type: DataTypes.DATE,
      allowNull: true
    },
    

  }, {
    tableName: "students",
    freezeTableName: true, // ✅ disables pluralization, uses 'staff' not 'staffs'
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    
  });

Student.associate = (models) => {
    Student.hasMany(models.StudentSession, {
      as: 'sessions',
      foreignKey: 'student_id'
    });
  };
  return Student;
};
