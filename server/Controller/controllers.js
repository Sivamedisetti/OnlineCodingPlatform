const {Questions_Table , register} = require('../Model/models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid');

const GetAllProblems = async(req , res) => {
    await Questions_Table.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

const SignUp = async(req , res) => {
    try {
        const { username, password, email } = req.body;
        const hashed_password = await bcrypt.hash(password, 10);
        let access = 'user';
        if(email == 'admin@codeforge.com'){
          access = 'admin';
        }
        const userid = nanoid();
        const newUser = new register({
          userid,
          access,
          username,
          email,
          password: hashed_password,
        });
    
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } 
    catch (err) {
        if(err.code === 11000) res.status(400).json({error: "Username already exists."});
        else res.status(500).json({ error: "Failed to register user. Please try again."});
    }
}

const SignIn = async(req , res) => {
    const {email , password} = req.body;
    const user = await register.findOne({email});

    if(user)
    {
    const match = await bcrypt.compare(password , user.password);
    if(match) {
        req.session.user = { id: user.userid, username: user.username };
        res.status(200).json({username: user.username , access: user.access});
    }
    else res.status(400).json({message: 'Invalid Password'});
    }
    else res.status(404).json({message: "User Not Found"});
}

const AddProblem = async(req , res) => {
    const newProblem = new Questions_Table({
        user: req.session.id,
        title: req.body.title,
        description: req.body.description,
        sample_input: req.body.sample_input,
        sample_output: req.body.sample_output,
        constraints: req.body.constraints,
        test_cases: req.body.test_cases,
        URL: req.body.URL,
        Topic_difficulty: req.body.Topic_difficulty,
        status: "pending"
    });
    
    await newProblem
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
}

const GetProblem = async(req , res) => {
    const problemId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }

    await Questions_Table.findById(problemId)
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
}

const DeleteProblem = async (req , res) => {
  const problemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).send({ error: "Invalid ID format" });
  }

  try{
    await Questions_Table.findByIdAndDelete(problemId);
    res.status(200).send({ message: 'Problem deleted' });
  }
  catch (error) {
    res.status(500).send({ message: 'Delete failed', error });
  }
}

module.exports = {
    GetAllProblems,
    SignIn,
    SignUp,
    AddProblem,
    GetProblem,
    DeleteProblem
}