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
// const MongoStore = require("connect-mongo")(session);
// const flash = require("express-flash");
// const path = require("path");
// const mysql = require("mysql");
// const passport = require("passport");
// const expressStatusMonitor = require("express-status-monitor");
// const sass = require("node-sass-middleware");
// const multer = require("multer");

// const upload = multer({ dest: path.join(__dirname, "uploads") });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Controllers (route handlers).
 */
// const homeController = require("./controllers/home");
// const userController = require("./controllers/user");
// const apiController = require("./controllers/api");
// const contactController = require("./controllers/contact");

const ordersController = require("./controllers/orders");

/**
 * API keys and Passport configuration.
 */
// const passportConfig = require("./config/passport");
const connection = require("./config/connection");

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MySql.
 */
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });

// const connection = mysql.createConnection({
//   host: "localhost",
//   // user: "me",
//   password: "secret",
//   database: "my_db",
// });

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// con.end();

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.use(expressStatusMonitor());
app.use(compression());
// app.use(
//   sass({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//   })
// );
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

/* API'S */

app.get("/orders", ordersController.getOrders); // get all orders

app.post("/orders", ordersController.addOrder); // add order

app.get("/orders/:id", ordersController.getOrderById); //get order by id

app.put("/orders/:id", ordersController.updateOrder); //get order by id

app.delete("/orders", ordersController.deleteOrder); //get order by id

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
