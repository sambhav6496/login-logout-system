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
    res.render("register");
  })
  .post((req, res) => {
    const user ={
      email : req.body.email,
      password: req.body.password
    }

    let checkUser =  new User
    const {data,error} = checkUser.registration(user)
    if(error){
      res.status(400).json(error)
    }else{
      res.status(200).json(data)
    }

  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user ={
      email : req.body.email,
      password: req.body.password
    }

    let checkUser = new User
    const { loggedIn, error } = checkUser.login(user)
    if(error){
      res.status(400).json(error)
    }else{
      res.status(200).json(loggedIn)
    }
  });


module.exports = router;
