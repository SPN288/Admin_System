const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  email_id: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'manager', 'admin'], required: true },
});

module.exports = mongoose.model('Role', roleSchema);
