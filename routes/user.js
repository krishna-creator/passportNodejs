const express = require("express");
const users = require("../models/users");
const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));

userRouter.route("/register").post((req, res) => {
  users.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      return res.status(400).send("Email is alredy exited");
    }
    users
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then((result) => {
        res.redirect("/login.html");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

userRouter.route("/login").post(async (req, res) => {
  const useremail = await users.findOne({ email: req.body.email });
  if (!useremail) return res.status(400).send("email is incorrect");

  if (useremail.password == req.body.password)
    return res.status(200).send("Logged in sucessfully");
  res.send("password is incorrect");
});

module.exports = userRouter;
