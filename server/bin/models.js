const { type } = require('@testing-library/user-event');
const mongoose = require('mongoose');

const Register = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Questions_table = new mongoose.Schema({
    test_cases : {
        type :String,
        // required : true
    },
    title : { 
        type: String,
        unique :true,
        required: true,

    },
    Topic_difficulty :{
        type: String,
        // required: true,

    },
    URL :{ 
        type : String,
        // required : true,
    },
    description:{
        type : String,
        // required : true,
    },
    constraints:{
        type: Number,
        // required : true,
    },
    sample_input:{
        type:String,
        // required : true,
    },
    sample_output:{
        type:String,
        // required : true    
    }
});

const Questions_Table = mongoose.model("Questions_table",Questions_table);
const register = mongoose.model('Register', Register);
module.exports = {Questions_Table , register};