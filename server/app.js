const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const Router = require("./Routes/routes")
const dotenv = require('dotenv').config();

const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60
  }
}));
app.use("/", Router);

mongoose
  .connect(
    process.env.Database_URL,
  )
  .then(() => {
    console.log("Connected to Mongo DB");
    server.listen(8000, () => {
      console.log(`App running on port: 8000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
