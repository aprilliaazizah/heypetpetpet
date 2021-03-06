"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/db.js")[env];
const logger = require(__dirname + "/../utils/winstonLog");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

if (sequelize) {
  sequelize
    .authenticate()
    .then(() => {
      logger.info(`DB connection established: ${config.database}`);
      console.info(`DB connection established: ${config.database}`);
    })
    .catch((err) => {
      logger.error(err);
      console.error("Unable to connect database:", err);
    });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("../heypet-e586d-firebase-adminsdk-r4zci-fb8c941b5c.json");

initializeApp({
  credential: cert(serviceAccount),
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
