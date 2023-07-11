const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/books", require("./routes/book-routes"));

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.zfglxjw.mongodb.net/bookStore?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
