const Joi = require("joi");
const express = require("express");
const app = express();
let router = express.Router();
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
const User = require('./users.js')
bodyParser.urlencoded({
  extended: false,
})
app.use(bodyParser.json())

router
  .route("/register")
  .get((req, res) => {
    res.render("register", { message: "" });
  })
  .post((req, res) => {
    const user ={
      email : req.body.email,
      password: req.body.password
    }

    checkUser =  new User
    const {message,error} = checkUser.registration(user)
    if(message == "error"){
      res.status(400).json(error)
    }else if(message == "user Exist"){
      res.status(400).json("userExist")
    }else{
      res.status(200).json("user successfully added")
    }

  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {

  });


module.exports = router;
