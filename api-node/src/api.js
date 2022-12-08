const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/** ----ROTAS----*/
const router = express.Router();
const route = require("./routers/router");
app.use("/", route);
module.exports = app;
