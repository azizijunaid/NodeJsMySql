const connection = require("../config/connection");
// const { result } = require("lodash");
// const validator = require("validator");

exports.getOrders = (req, res, next) => {
  connection.query("SELECT * FROM orders", (err, rows) => {
    if (err) throw err;
    console.log("Data received from Db:");
    // console.log(rows);
    if (rows) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: "not found" });
    }
  });
};

exports.addOrder = (req, res) => {
  const { body } = req;
  console.log("body", body);
  // console.log("body", JSON.parse(body));
  connection.query("INSERT INTO orders SET ?", body, (err, result) => {
    if (err) throw err;

    console.log("Last insert ID:", result.insertId);
    res.status(200).json(result.insertId);
  });
};

exports.getOrderById = (req, res) => {
  console.log("query", req.query);
  const {
    query: { id },
  } = req;
  connection.query(
    `SELECT * from orders WHERE order_id=?`,
    id,
    (err, result) => {
      if (err) throw err;

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "not found" });
      }
    }
  );
};

exports.updateOrder = (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  const {
    query: { id },
    body,
  } = req;
  connection.query(
    "UPDATE `orders` SET ? WHERE `order_id` = ?",
    [body, id],
    (err, result) => {
      if (err) throw err;

      console.log("result:", result);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "not found" });
      }
    }
  );
};

exports.deleteOrder = (req, res) => {
  const {
    body: { id },
  } = req;

  connection.query(
    "DELETE FROM `orders` WHERE `order_id`=?",
    id,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json(results);
    }
  );
};
