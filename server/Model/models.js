const { type } = require('@testing-library/user-event');
const mongoose = require('mongoose');

const Register = new mongoose.Schema({
    userid: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    }
});

const Questions_table = new mongoose.Schema({
    userId: {
        type: String
    },
    progress: {
        type: String
    },
    test_cases: [
        {
            input: { type: String, required: true },
            output: { type: String, required: true }
        }
    ],
    title : { 
        type: String,
        unique :true,
        required: true,

    },
    Topic_difficulty :{
        type: String,

    },
    URL :{ 
        type : String,
    },
    description:{
        type : String,
    },
    constraints:{
        type: Number,
    },
    sample_input:{
        type:String,
    },
    sample_output:{
        type:String, 
    },
    explaination:{
        type: String,
    },
    status:{
        type:String,
        default:"pending"
    },
    user:{
        type: String
    }
});

const Questions_Table = mongoose.model("Questions_table",Questions_table);
const register = mongoose.model('Register', Register);
module.exports = {Questions_Table , register};