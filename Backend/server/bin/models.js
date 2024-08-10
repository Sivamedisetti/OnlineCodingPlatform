const mongoose = require('mongoose');

const Questions_table = new mongoose.Schema({
    S_NO : {
        type :String,
    },
    Question_Name : { 
        type: String 
    },
    Topic_difficulty :{
        type: String
    },
    URL :{ 
        type : String,
    },
    Type : {
        type : String,
    },
    Youtube_link :{
        type : String,
    } 
});

const Questions_Table = mongoose.model("Questions_table",Questions_table);
module.exports = {Questions_Table};