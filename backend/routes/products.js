const express = require('express');
const router = express.Router()
const Product =require( '../models/ProductModel');
// Routes
// Add Product
router.post('/products', async (req, res) => {
    const { product_id, pdname, description, stock, img_url } = req.body;
    try {
      const newProduct = new Product({ product_id, pdname, description, stock, img_url });
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  });
  
  // Get All Products
  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  });
  
  // Update Product
  router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  });
  
  // Delete Product
  router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  });
  module.exports = router;