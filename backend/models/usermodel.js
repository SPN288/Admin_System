const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  mobile_number: { type: String, required: true },
  department:{type:String,required:true},
  password: { type: String, required: true}
});

module.exports = mongoose.model('UserModel', userSchema);
