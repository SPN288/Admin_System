import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Navbar';
import ProductForm from '../../Components/ProductForm';
import ProductEditForm from '../../Components/ProductEditForm';
import '../loginform.css'

export default function ManageProductsManage() {
    const navigate = useNavigate();
    const [amail, setamail] = useState();
    useEffect(() => {
        setamail(localStorage.getItem('amail'));
      }, [])
    const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const handleLogOut = (e) => {
    localStorage.removeItem('amail');
    localStorage.removeItem('atoken');
    navigate("/")
  }

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async (product) => {
    try {
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Edit an existing product
  const handleEditProduct = async (id, updates) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchProducts();
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
    <Navbar email_id={amail} logout={<button className='button-32' onClick={handleLogOut}>Logout</button>} />
    <div>
      <h1>Product Management</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      {editProduct && (
        <ProductEditForm
          product={editProduct}
          onEditProduct={handleEditProduct}
        />
      )}
      <div>
        <h2>Product List</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                    <tr key={product._id}>
                        <td>{product.product_id}</td>
                        <td>{product.pdname}</td>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td><button onClick={() => setEditProduct(product)}>Edit</button></td>
                        <td><button onClick={() => handleDeleteProduct(product._id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
      </div>
    </div>
    </>
  )
}