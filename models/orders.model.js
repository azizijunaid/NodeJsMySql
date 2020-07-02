var sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define(
    "orders",
    {
      order_id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
      },
      consumer_id: {
        type: Sequelize.NUMBER,
      },
      brand_branch_id: {
        type: Sequelize.NUMBER,
      },
      cart_id: {
        type: Sequelize.NUMBER,
      },
      summary: {
        type: Sequelize.STRING,
      },
      shipping_address: {
        type: Sequelize.STRING,
      },
      billing_address: {
        type: Sequelize.STRING,
      },
      logistics_provider: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,
    }
  );

  return Orders;
};
