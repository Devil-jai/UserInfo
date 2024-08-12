const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        require: true
    },
    email: {
        type:String,
        require:true,
        uniqure:[true,"Email_id Already Exist"]
    },
    password:{
        type:String,
        require:true
    }
    
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
