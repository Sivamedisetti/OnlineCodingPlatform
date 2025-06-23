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
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:'https://codeforge-dyvj.onrender.com',
  credentials: true
}));
app.use(session({
  name: 'codeforge.sid',
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.Database_URL,
    ttl: 2 * 24 * 60 * 60 
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 2 * 24 * 60 * 60 * 1000
  }
}));

app.use((req,res)=> {
  console.log('session',req.session)
})

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
