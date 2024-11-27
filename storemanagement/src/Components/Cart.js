import React from 'react';

const Cart = ({ cart, setCart, fetchProducts }) => {
  const updateQuantity = (productId, delta) => {
    setCart(
      cart.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = async () => {
    try {
      await Promise.all(
        cart.map(async (item) => {
          await fetch(`http://localhost:5000/products/${item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              stock: item.stock - item.quantity,
            }),
          });
        })
      );
      alert('Checkout successful!');
      setCart([]); // Clear the cart
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
    <div className="cart-modal ">
      <h2>Cart</h2>
      {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
            <>
          {cart.map((item) => (
              <div key={item.product_id} className="cart-item">
              <h4>{item.pdname}</h4>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => updateQuantity(item.product_id, -1)}>-</button>
              <button onClick={() => updateQuantity(item.product_id, 1)}>+</button>
              <br/>
              <button onClick={() => updateQuantity(item.product_id, -item.quantity)}>
                Remove
              </button>
            </div>
          ))}
          <br/>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
      </>
  );
};

export default Cart;
