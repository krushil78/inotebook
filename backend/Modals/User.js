const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type : String,
    requied: true
  },
  email:{
    type : String,
    requied: true,
    unique: true
  },
  password:{
    type : String,
    requied: true
  },
 date:{
    type : String,
    default: Date.now
  },


});
const User = mongoose.model('user' ,UserSchema);
  
User.createIndexes();
module.exports = User