const express = require("express");
const router = express.Router();
const student = require("../controllers/student.controller.js");
const authMiddleware = require('../middleware/auth.middleware');


// router.get("/getStaff", staff.findAll);
router.post('/student-detail', authMiddleware, student.studentDetails);
router.get('/getclass', authMiddleware, student.getAllClasses);
router.get('/getsection', authMiddleware, student.getAllsection);

module.exports = router;
