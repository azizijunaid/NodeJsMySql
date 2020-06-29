const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "orderdb",
  port: 3306,
});

connection.connect(function (err) {
  if (err) {
    console.log("Connection Error", JSON.stringify(err, 2));
  }
  console.log("Connected!");
});

module.exports = connection;
