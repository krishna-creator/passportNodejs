const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");
const session = require("express-session");

const app = express();

//static files
app.use("/", express.static("public"));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

//mongodb connection
mongoose.connect(
  "mongodb://localhost/jahnavi",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log("connected to database");
  }
);

//routes
app.use("/", userRouter);

//session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//port
app.listen(3000, () => {
  console.log("connected to server");
});
