// const connection = require("../config/connection");
// const { result } = require("lodash");
// const validator = require("validator");
// const Orders = require("../models/orders.model");
const db = require("../models/");
const { order } = require("paypal-rest-sdk");

const {
  Orders,
  Sequelize: { Op },
} = db;
// const Op = db.Sequelize.Op;
exports.getOrders = async (req, res, next) => {
  // connection.query("SELECT * FROM orders", (err, rows) => {
  //   if (err) throw err;
  //   // console.log(rows);
  //   if (rows.length) {
  //     res.status(200).json(rows);
  //   } else {
  //     res.status(404).json({ error: "not found" });
  //   }
  // });

  try {
    const data = await Orders.findAll({
      attributes: [
        "order_id",
        "consumer_id",
        "brand_branch_id",
        "cart_id",
        "summary",
        "shipping_address",
        "billing_address",
        "logistics_provider",
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Order.",
    });
  }
};

exports.addOrder = async (req, res) => {
  const { body } = req;
  // connection.query("INSERT INTO orders SET ?", body, (err, result) => {
  //   if (err) throw err;

  //   res.status(200).json(result.insertId);
  // });

  try {
    const data = await Orders.create(body);
    console.log("exports.addOrder -> data", data);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.getOrderById = async (req, res) => {
  const {
    query: { id },
  } = req;
  // connection.query(
  //   `SELECT * from orders WHERE order_id=?`,
  //   id,
  //   (err, result) => {
  //     if (err) throw err;

  //     if (result) {
  //       res.status(200).json(result);
  //     } else {
  //       res.status(404).json({ error: "not found" });
  //     }
  //   }
  // );

  try {
    const data = await Orders.findOne({
      where: {
        order_id: id,
      },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.updateOrder = async (req, res) => {
  const {
    query: { id },
    body,
  } = req;
  // connection.query(
  //   "UPDATE `orders` SET ? WHERE `order_id` = ?",
  //   [body, id],
  //   (err, result) => {
  //     if (err) throw err;

  //     if (result) {
  //       res.status(200).json(result);
  //     } else {
  //       res.status(404).json({ error: "not found" });
  //     }
  //   }
  // );

  try {
    await Orders.update(body, { where: { order_id: id } });
    res.send({ message: "successfully updated" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  const {
    body: { id },
  } = req;

  // connection.query(
  //   "DELETE FROM `orders` WHERE `order_id`=?",
  //   id,
  //   (error, results, fields) => {
  //     if (error) throw error;
  //     res.status(200).json(results);
  //   }
  // );

  try {
    const data = await Orders.destroy({ where: { order_id: id } });
    res.send({ message: "successfully deleted" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the Order.",
    });
  }
};
