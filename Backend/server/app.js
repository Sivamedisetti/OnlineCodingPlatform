// // var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// const mongoose = require("mongoose");
// const BodyParser = require("body-parser");
// var nodemailer = require("nodemailer");

// const cors = require("cors");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var { Questions_Table } = require("./bin/models");
// var app = express();

// //mongodb connection
// mongoose.connect("mongodb+srv://root:admin@dsp.51ylmqg.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.once("open", function () {
//   console.log("connected successfully");
// });

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
// app.use(cors());

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// //get and post calls
// app.get("/get_codesheet", function (req, res) {
//   Questions_Table.find()
//     .then((data) => res.send(data))
//     .catch((err) => console.log(err));
// });
// app.post("/ ", function (req, res) {
//   Questions_Table.find({ _id: req.body.id })
//     .then((data) => res.send(data))
//     .catch((err) => console.log(err));
// });

// app.get("/get_problemdata/:id", function (req, res) {
//   const problemId = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(problemId)) {
//     return res.status(400).send({ error: "Invalid ID format" });
//   }

//   Questions_Table.findById(problemId)
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send({ error: "Problem not found" });
//       }
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error("Error fetching problem:", err);
//       res.status(500).send({ error: "Server error" });
//     });
// });

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// app.listen(8000, function () {
//   console.log("server started");
// });

// module.exports = app;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
var nodemailer = require("nodemailer");

const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var { Questions_Table } = require("./bin/models");
var app = express();

//mongodb connection
mongoose.connect("mongodb+srv://root:admin@dsp.51ylmqg.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("connected successfully");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//get and post calls
app.get("/get_codesheet", function (req, res) {
  Questions_Table.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
app.post("/ ", function (req, res) {
  Questions_Table.find({ _id: req.body.id })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.get("/get_problemdata/:id", function (req, res) {
  const problemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).send({ error: "Invalid ID format" });
  }

  Questions_Table.findById(problemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ error: "Problem not found" });
      }
      res.send(data);
    })
    .catch((err) => {
      console.error("Error fetching problem:", err);
      res.status(500).send({ error: "Server error" });
    });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000, function () {
  console.log("server started");
});

module.exports = app;