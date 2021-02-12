const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const login = require('./routes/login')
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json())
const path = require("path");

app.use("/api", login)

app.listen(3000, function () {
  console.log("listening on 3000");
});
