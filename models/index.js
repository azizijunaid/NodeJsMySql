const dbConfig = {
  HOST: "localhost" || "http://sql12.freemysqlhosting.net/",
  USER: "sql12353213",
  PASSWORD: "K5bhyrDx3f",
  DB: "sql12353213",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Orders = require("./orders.model.js")(sequelize, Sequelize);

module.exports = db;
