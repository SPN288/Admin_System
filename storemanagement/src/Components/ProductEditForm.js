import React, { useState } from 'react';

const ProductEditForm = ({ product, onEditProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProduct(product._id, updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Edit Product</h2>
      <input name="pdname" value={updatedProduct.pdname} onChange={handleChange} placeholder="Product Name" />
      <input name="description" value={updatedProduct.description} onChange={handleChange} placeholder="Description" />
      <input type='number' name="stock" value={updatedProduct.stock} onChange={handleChange} placeholder="Stock" />
      <input name="img_url" value={updatedProduct.img_url} onChange={handleChange} placeholder="Image URL" />
      
      <button type="submit">Update</button>
    </form>
  );
};

export default ProductEditForm;
