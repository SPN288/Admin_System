import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <div className="product-card">
      <img src={product.img_url} alt={product.pdname} width="200" height="100" />
      <h3>{product.pdname}</h3>
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
