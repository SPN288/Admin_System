const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('AdminModel', adminSchema);
