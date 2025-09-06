const express = require("express");
const router = express.Router();
const staff = require("../controllers/staff.controller.js");
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.js');

// router.get("/getStaff", staff.findAll);
router.get("/profile",authMiddleware, staff.findOne);
router.post('/change-password', authMiddleware, staff.changePassword);
router.put('/staff/:id', upload.single('image'), staff.update);
router.delete("/delete", staff.delete);

module.exports = router;
