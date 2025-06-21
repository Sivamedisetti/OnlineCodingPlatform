const {Questions_Table , register} = require('../Model/models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid');
const { auth } = require('./firebase');
const admin = require('./firebase_admin')
const { signInWithEmailAndPassword , createUserWithEmailAndPassword } = require("firebase/auth");

const GetAllProblems = async(req , res) => {
    await Questions_Table.find({ status: "Accepted"})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
}

const GetAllUsers = async(req , res) => {
    await register.find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
}

const GetPendingList = async(req , res) => {
    await Questions_Table.find({ status: "pending" })
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
}

const UpdateStatus = async (req, res) => {
    const { status , id } = req.body;
  
    try {
      const updated = await Questions_Table.findOneAndUpdate(
        { _id: id },
        { status: status },
        { new: true } 
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ message: "Status updated", data: updated });
    } 
    catch (err) {
      res.status(500).json({ message: "Error updating status", error: err.message });
    }
};

const UpdateAccess = async(req , res) => {
    const {userid , role} = req.body;
    try {
      const updated = await register.findOneAndUpdate(
        { userid: userid },
        { access: role },
        { new: true } 
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ message: "Status updated", data: updated });
    } 
    catch (err) {
      res.status(500).json({ message: "Error updating status", error: err.message });
    }
}
  
const SignUp = async(req , res) => {
  const { password, email } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        let access = 'user';
        let username = email.split('@')[0]
        if(email == 'admin@codeforge.com'){
          access = 'admin';
        }
        const userid = nanoid();
        const newUser = new register({
          userid,
          access,
          username: username.charAt(0).toUpperCase() + username.slice(1).toLowerCase(),
          email,
          password: "firebase"
        });
    
        await newUser.save();
        res.json({ name: username, uid: decodedToken.uid });
    } 
    catch (err) {
        if(err.code === 11000) res.status(400).json({error: "Username already exists."});
        else res.status(500).json({ error: err.message });
    }
}

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    let username = email.split('@')[0]

    const name = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    req.session.user = {
      id: user.userid,
      username: user.username,
      access: user.access
    };

    res.json({ name: name, uid: decodedToken.uid, access: user.access });

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const Social = async (req , res) => {
  const { idToken } = req.body;
  try {
    console.log('idToken', idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log('decodeToken',decodedToken)
    const email = decodedToken.email || "";
    const name = email.split("@")[0];
    const user = await register.findOne({email});

    if(!user){
      const userid = nanoid();
      const newUser = new register({
        userid,
        access: 'user',
        username: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        email,
        password: "firebase"
      });
      await newUser.save();
      return res.status(200).json({ name, uid: decodedToken.uid, access: 'user'});
    }
    
    else return res.status(200).json({ name: user.username, uid: decodedToken.uid ,  access: user.access});
  } catch (err) {
    console.error("Social Auth Error:", err);
    return res.status(401).json({ message: err });
  }
}

const AddProblem = async(req , res) => {
    const user = req.session.user;
    if(user === undefined){
        return res.status(401).json({message: "navigate to logout"});
    }
    const newProblem = new Questions_Table({
        userId: user.id,
        username: user.username,
        title: req.body.title,
        description: req.body.description,
        sample_input: req.body.sample_input,
        sample_output: req.body.sample_output,
        constraints: req.body.constraints,
        test_cases: req.body.test_cases,
        URL: req.body.URL,
        Topic_difficulty: req.body.Topic_difficulty,
        status: user.access === "admin" ? "accepted" : "pending"
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

const DeleteUser = async (req, res) => {
  const { id, email } = req.body;

  try {
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const firebaseUser = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(firebaseUser.uid);

    await register.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    GetAllProblems,
    SignIn,
    SignUp,
    AddProblem,
    GetProblem,
    DeleteProblem,
    GetPendingList,
    UpdateStatus,
    GetAllUsers,
    UpdateAccess,
    DeleteUser,
    Social
}
