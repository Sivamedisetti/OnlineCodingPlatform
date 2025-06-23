const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const Router = require("./Routes/routes")
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
const server = http.createServer(app);
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://codeforge-dyvj.onrender.com'
  ],
  credentials: true
}));

app.use(session({
  secret: process.env.SECERT,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  store: MongoStore.create({
    mongoUrl: process.env.Database_URL,
    ttl: 2 * 24 * 60 * 60 
  }),
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
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
  })
  .catch((err) => {
    console.error(err);
  });


server.listen(8000, () => {
  console.log(`App running on port: 8000`);
});
module.exports = app;
