const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

const app = express();
app.use("/", express.static("public"));

mongoose.connect(
  "mongodb://localhost/jahnavi",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log("connected to database");
  }
);
app.get("/", (req, res) => {
  res.end("hi");
});
app.use("/api", userRouter);

app.listen(3000, () => {
  console.log("connected to server");
});
