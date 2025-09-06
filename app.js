require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
app.use(bodyParser.json());

// Sync database
db.sequelize.sync();

app.get("/", (req, res) => res.send("API is running..."));

// Auth Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/staff", require("./routes/staff.routes"));
app.use("/api/student", require("./routes/student.routes"));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
