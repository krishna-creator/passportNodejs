const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");
const session = require("express-session");
const passport = require("passport");
const Filestore = require("session-file-store")(session);
require("./config/passport")(passport);

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

//session
app.use(
  session({
    name: "session-id",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new Filestore(),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

//passprot middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", userRouter);
//port
app.listen(3000, () => {
  console.log("connected to server");
});
