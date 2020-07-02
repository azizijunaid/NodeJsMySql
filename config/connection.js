// // const mysql = require("mysql");
// const Sequelize = require("sequelize");
// // const connection = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "root",
// //   database: "orderdb",
// //   port: 3306,
// // });

// // connection.connect(function (err) {
// //   if (err) {
// //     console.log("Connection Error", JSON.stringify(err, 2));
// //   }
// //   console.log("Connected!");
// // });

// const connection = new Sequelize("orderdb", "root", "root", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },

//   // SQLite only
//   // storage: "path/to/database.sqlite",
// });

// module.exports = connection;
