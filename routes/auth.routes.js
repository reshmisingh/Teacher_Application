const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.post("/register", auth.register);
router.post("/savePersonalInfo", auth.savePersonalInfo);
router.post("/saveSocialInfo", auth.saveSocialInfo);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);

module.exports = router;
