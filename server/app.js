const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const Router = require("./Routes/routes")
const dotenv = require('dotenv').config();

const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.Database_URL,
    ttl: 75 * 60 * 60 
  }),
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 24 * 60 * 60 * 1000
  }
}));
app.use("/", Router);

mongoose
  .connect(
    process.env.Database_URL,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
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
