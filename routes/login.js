const Joi = require("joi");
const express = require("express");
const app = express();
let router = express.Router();
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const users = [];
let status = "";

router
  .route("/register")
  .get((req, res) => {
    res.render("register", { message: "" });
  })
  .post((req, res) => {
      console.log([req.body.password, req.body.email]);
      const checkUser = {
        email: req.body.email,
        password: req.body.password,
      };
      console.log(checkUser);
      const { value, error } = validateUser(checkUser);
      if (error) {
        status = "error";
        res.status(404).render("register", { message: error.message });
      } else {
        const user = users.find((u) => {
          if (u.email === req.body.email) {
            status = "user exist";
            res.status(404).render("register", { message: "user exist" });
          } else {
            const newUser = {
              email: req.body.email,
              password: req.body.password,
            };
            users.push(newUser);
            console.log("users is" + users);
            res.status(200).render("ok");
          }
        });
      }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user = users.find((u) => {
      if (u.email === req.body.email) {
        return u;
      }
    });
    if (user) {
      const hash = user.password;
      const passwordEntered = req.body.password;
      if (bcrypt.compareSync(passwordEntered, hash)) {
        res.status(200).json("logged in");
      } else {
        res.status(404).json("wrong password");
      }
    } else {
      res.status(404).json("user not exist");
    }
  });

function validateUser(user) {
  const JoiSchema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

module.export = validateUser;

module.exports = router;
