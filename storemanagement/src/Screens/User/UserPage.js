import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import ProductCard from '../../Components/ProductCard';
import Cart from '../../Components/Cart';

export default function UserPage() {
  const navigate = useNavigate();
  const [umail, setamail] = useState();
  useEffect(() => {
    setamail(localStorage.getItem('umail'));
  }, [])
  const handleLogOut = (e) => {
    localStorage.removeItem('umail');
    localStorage.removeItem('utoken');
    navigate("/")
  }

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

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

  // Add product to cart
  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.product_id === product.product_id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };





  return (
    <>
      <Navbar email_id={umail} cart={<button onClick={() => setIsCartVisible(true)}>View Cart</button>} logout={<button className='button-32' onClick={handleLogOut}>Logout</button>} />


      <div>
        <h1>Product Catalog</h1>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>

        <div className='productbox'>
          {/* Cart Overlay */}
          {isCartVisible && (
            <div className="cart-overlay">
              <Cart cart={cart} setCart={setCart} fetchProducts={fetchProducts} />
              <button className="close-cart" onClick={() => setIsCartVisible(false)}>
                Close Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
