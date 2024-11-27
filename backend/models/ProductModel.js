const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: { type: Number, required: true, unique: true },
    pdname: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    img_url: { type: String }
  });
module.exports = mongoose.model('Product', productSchema);
