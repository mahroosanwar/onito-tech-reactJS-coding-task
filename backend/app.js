const express = require("express");
const mongoose = require("mongoose");

const registrationRoutes = require("./routes/registration");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/registration", registrationRoutes);

mongoose
  .connect(
    "mongodb+srv://mahroosanwar:Oneplus1@cluster0.ulplod4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected!");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
