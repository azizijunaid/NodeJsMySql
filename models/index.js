// const dev = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "root",
//   DB: "orderdb",
//   dialect: "mysql",
// };

const config = {
  dev: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "orderdb",
    dialect: "mysql",
  },
  prod: {
    HOST: "sql12.freemysqlhosting.net",
    USER: "sql12353213",
    PASSWORD: "K5bhyrDx3f",
    DB: "sql12353213",
    dialect: "mysql",
  },
};

const dbConfig = {
  HOST: config["prod"].HOST,
  USER: config["prod"].USER,
  PASSWORD: config["prod"].PASSWORD,
  DB: config["prod"].DB,
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

sequelize
  .authenticate()
  .then(() => console.log("conection success"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = db;
