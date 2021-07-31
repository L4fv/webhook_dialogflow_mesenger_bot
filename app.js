const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const log = require("./utils/logger");
const app = express();
const cors = require("cors");


//ENV PRODUCCION
const isProd = process.env.NODE_ENV === "production";

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: `.env.${process.env.NODE_ENV}` });

// Usamos body-parse para revisar el body cuando los request son post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Cros */
if (!isProd) {
  app.use(cors());

  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "example.com");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
}

/* CONTROLLERS */
const templateController = require("./api/controllers/template");


// Registro de puerto y servidor.
app.disable("x-powered-by");
app.set("port", process.env.PORT);
app.set("host", process.env.NODEJS_IP);

// ENDPOINT GET PRUEBA
app.get(
  "/",
  (rootHandler = (req, res) => {
    res.json("MicroServicio running");
  })
);



// ENDPOINTS POST
app.post("/ms/webhook", templateController.template);


// Iniciando Servidor.
app.listen(app.get("port"), app.get("host"), () => {
  log.info(`MS on http://${app.get("host")}:${app.get("port")}`);
});
