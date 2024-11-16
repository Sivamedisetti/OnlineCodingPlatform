var express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bcrypt = require('bcryptjs')
const cors = require("cors");
var { Questions_Table } = require("./bin/models");
const { register } = require("./bin/models");


var app = express();
app.use(cors());
const server = http.createServer(app);

mongoose.connect(
  "mongodb+srv://ajaykantiboyina:Ajay%406203@cluster0.vleuyp5.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", function () {
  console.log("connected successfully");
});

//get and post calls
app.get("/get_codesheet", function (req, res) {
  Questions_Table.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/signup', async function(req, res) {
  try {
    const { username, password, email } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = new register({
      username,
      email,
      password: hashed_password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } 
  catch (err) {
    if(err.code === 11000) res.status(400).json({error: "Username already exists."});
    else res.status(500).json({ error: "Failed to register user. Please try again." });
  }
});


app.post('/login', async function (req , res){
  const {username , password} = req.body;
  const user = await register.findOne({username});

  if(user)
  {
    const match = await bcrypt.compare(password , user.password);
    if(match) res.status(200).json({message: 'navigate to Home'});
    else res.status(400).json({message: 'Invalid Password'});
  }
  else res.status(404).json({message: "User Not Found"});
});


app.post("/post_problem", function (req, res) {
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
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Duplicate key error
        res
          .status(400)
          .send({ error: "A problem with this title already exists" });
      } else {
        console.log(err);
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

server.listen(8000, function () {
  console.log("server started");
});

module.exports = app;
