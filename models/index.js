const dbConfig = {
  HOST: "ec2-34-224-229-81.compute-1.amazonaws.com",
  USER: "porzxkwjymelco",
  PASSWORD: "3cf74321ad843ae8779c512ee1af86137530564a13c287b3b229906008128e78",
  DB: "ddpq6na2p695br",
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
