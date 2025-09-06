// models/student_session.model.js
module.exports = (sequelize, DataTypes) => {
  const StudentSession = sequelize.define("StudentSession", {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "student_sessions",
    timestamps: false
  });

 StudentSession.associate = (models) => {
    StudentSession.belongsTo(models.Student, {
      foreignKey: 'student_id'
    });
};

  return StudentSession;
};
