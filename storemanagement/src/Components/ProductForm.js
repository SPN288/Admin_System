import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    product_id: '',
    pdname: '',
    description: '',
    stock: '',
    img_url: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ product_id: '', pdname: '', description: '', stock: '', img_url: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Add Product</h2>
      <input name="product_id" value={product.product_id} onChange={handleChange} placeholder="Product ID" required />
      <input name="pdname" value={product.pdname} onChange={handleChange} placeholder="Product Name" required />
      <input name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <input name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" required />
      <input name="img_url" value={product.img_url} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Add</button>
    </form>
  );
};

export default ProductForm;
