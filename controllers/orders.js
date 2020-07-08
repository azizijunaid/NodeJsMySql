const db = require("../models/");

const {
  Orders,
  Sequelize: { Op },
} = db;

const paginate = ({ page, pageSize }) => {
  const offset = Number(page * pageSize);
  const limit = Number(pageSize);

  return {
    offset,
    limit,
  };
};

exports.getOrders = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const count = await Orders.count({ distinct: true, col: "order_id" });
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
      ...paginate({ page, pageSize }),
    });
    res.send({ data, totalElements: count });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Order.",
    });
  }
};

exports.addOrder = async (req, res) => {
  const { body } = req;
  try {
    const data = await Orders.create(body);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const data = await Orders.findByPk(id);
    if (data === 0 || data === null) {
      throw new Error("id not found");
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

exports.updateOrder = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

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
    params: { id },
  } = req;

  try {
    const data = await Orders.destroy({ where: { order_id: id } });
    if (data === 0) {
      throw new Error("id not found");
    } else {
      res.send({ message: "successfully deleted" });
    }
  } catch (err) {
    res.status(404).send({
      message: err.message || "Some error occurred while deleting the Order.",
    });
  }
};
