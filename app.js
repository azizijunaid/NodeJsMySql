/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
// const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
const dotenv = require("dotenv");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Controllers (route handlers).
 */

const ordersController = require("./controllers/orders");

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", "http://sql12.freemysqlhosting.net" || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(compression());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");

/* API'S */

app.get("/orders", ordersController.getOrders); // get all orders

app.post("/orders", ordersController.addOrder); // add order

app.get("/orders/:id", ordersController.getOrderById); //get order by id

app.put("/orders/:id", ordersController.updateOrder); //update order by id

app.delete("/orders/:id", ordersController.deleteOrder); //delete order by id

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
