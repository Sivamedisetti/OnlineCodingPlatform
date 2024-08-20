var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
var nodemailer = require("nodemailer");

const http = require("http");
// const SocketId = require("socket.io");

const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var { Questions_Table } = require("./bin/models");
// const { Socket } = require("socket.io-client");
var app = express();

app.use(cors());

const server = http.createServer(app);

const io = SocketId(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

//mongodb connection
mongoose.connect(
  "mongodb+srv://ajaykantiboyina:Ajay1441@cluster0.vleuyp5.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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

app.post("/post_problem", function (req, res) {
  // console.log(res);
  const newProblem = new Questions_Table({
    title: req.body.title,
    description: req.body.description,
    sample_input: req.body.sample_input,
    sample_output: req.body.sample_output,
    constraints: req.body.constraints,
    test_cases: req.body.test_cases,
    URL: req.body.URL,
    Topic_difficulty: req.body.Topic_difficulty,
  });

  newProblem
    .save()
    .then((data) => {
      res.status(201).send(data);
      // io.emit("newPost", data)
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Duplicate key error
        res
          .status(400)
          .send({ error: "A problem with this title already exists" });
      } else {
        res.status(500).send({ error: "Server error" });
      }
    });
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

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//   console.log("User disconnected");
//   });
// });

server.listen(8000, function () {
  console.log("server started");
});

module.exports = app;
