const db = require("../models");
const Student = db.Student;
const { sequelize } = require('../models'); // Adjust path if needed

exports.studentDetails = async (req, res) => {
  const { classId, sectionId, keyword } = req.body;

  try {
    const replacements = {};
    let whereClause = "1=1";

    if (classId) {
      whereClause += " AND c.id = :classId";
      replacements.classId = classId;
    }

    if (sectionId) {
      whereClause += " AND s.id = :sectionId";
      replacements.sectionId = sectionId;
    }

    if (keyword) {
      whereClause += " AND st.firstname LIKE :keyword";
      replacements.keyword = `%${keyword}%`;
    }

    const query = `
      SELECT 
        st.*,
        c.class AS class_name,
        s.section AS section_name,
        ct.category as categoryName
      FROM students st
      JOIN student_session ss ON ss.student_id = st.id
      JOIN classes c ON ss.class_id = c.id
      JOIN sections s ON ss.section_id = s.id
      JOIN categories ct ON st.category_id = ct.id
      WHERE ${whereClause}
    `;

    const students = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).send({ statusCode: 200, data: students });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.findOne = async (req, res) => {
   try {
    const student = await Student.findByPk(req.user.id); // ID from decoded token
    if (!student) return res.status(404).json({statusCode: 404, message: "User not found" });
    res.status(200).json({statusCode: 200,data:student});
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM classes ORDER BY id ASC");
    res.status(200).send({
      statusCode: 200,
      data: results
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: err.message
    });
  }
};

//get all sections data
exports.getAllsection = async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM sections ORDER BY id ASC");
    res.status(200).send({
      statusCode: 200,
      data: results
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: err.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.send({ message: "student deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
