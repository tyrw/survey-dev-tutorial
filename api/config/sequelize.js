const fs = require("fs");
const path = require("path");
const modelsDirectory = path.join(__dirname, "../models");
const { Sequelize } = require("sequelize");
const db = {};

// Initialize the Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 5432,
  }
);

db.modelNames = [];

// Import and register all of the models in the /models directory
fs.readdirSync(modelsDirectory)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(modelsDirectory, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    db.modelNames.push(model.name);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export a reference to the library (Sequelize) and the instance (sequelize)
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
