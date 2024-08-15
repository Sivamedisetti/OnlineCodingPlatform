const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const Questions_table = new mongoose.Schema({
    test_cases : {
        type :String,
    },
    title : { 
        type: String 
    },
    Topic_difficulty :{
        type: String
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
    }
});

const Questions_Table = mongoose.model("Questions_table",Questions_table);
module.exports = {Questions_Table};