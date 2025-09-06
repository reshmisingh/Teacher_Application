const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: "auth-db546.hstgr.io",
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.staff = require("./staff.model.js")(sequelize, DataTypes);
db.Student = require("./student.model")(sequelize, Sequelize.DataTypes);
db.StudentSession = require("./studentSession.model")(sequelize, Sequelize.DataTypes);

// Run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
