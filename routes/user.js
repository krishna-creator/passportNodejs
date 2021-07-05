const express = require("express");
const bcrypt = require("bcrypt");
const users = require("../models/users");
const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));

// hashing = async (password) => {

//   return hashpassword;
// };

userRouter
  .route("/register")
  .get((req, res) => {
    res.sendFile("/public/register.html", { root: process.cwd() });
  })
  .post(async (req, res) => {
    try {
      const emailcheck = await users.findOne({ email: req.body.email });
      if (emailcheck) {
        return res.status(400).send("Email is alredy exited");
      }
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      const newuser = await users.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
      });
      if (newuser) res.redirect("/login.html");
    } catch (err) {
      console.log(err);
    }
  });

userRouter
  .route("/login")
  .get((req, res) => {
    res.sendFile("/public/login.html", { root: process.cwd() });
  })
  .post(async (req, res) => {
    const useremail = await users.findOne({ email: req.body.email });
    if (!useremail) return res.status(400).send("email is incorrect");

    const compare = await bcrypt.compare(req.body.password, useremail.password);
    if (compare) return res.status(200).redirect("/dashboard");

    res.send("password is incorrect");
  });
// function auth(req, res, next) {
//   console.log(req.isAuthenticated());
//   next();
// }

userRouter.route("/dashboard").get((req, res) => {
  // console.log(req.isAuthenticated());
  res.sendFile("/public/dashboard.html", { root: process.cwd() });
});

module.exports = userRouter;
