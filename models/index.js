const dbConfig = {
  HOST: "ec2-18-214-211-47.compute-1.amazonaws.com",
  USER: "usqolmkfaxdsvw",
  PASSWORD: "91f21b0c827c77b80a7ee36438130572154e969a40851f2dbf03cd4d08da2b4a",
  DB: "d1j7njooh0300j",
  dialect: "mysql",
  port: process.env.PORT || 3306,
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
