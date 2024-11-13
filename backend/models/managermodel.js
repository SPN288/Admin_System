const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, unique: true },
  email_id: { type: String, required: true},
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  store_id: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Manager', managerSchema);
