import React from 'react';
import ProductCard from './ProductCard';
import { AddToCart } from '../DBoperations/ProductDBoperations'

function ProductList({ username, products }) {

  // This is the real function to add product to cart
  const handleAddToCart = async (product) => {
    if (!username) {
      alert("Please login first!");
      return;
    }
    try {
      await AddToCart(username, product.name);
      alert("Added to cart!");
    } catch (error) {
      alert("Failed to add to cart: " + error.message);
    }
  };

  const handleBuyNow = (product) => {
    // Your buy now logic here
  };

  return (
    <div>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          handleAddToCart={handleAddToCart} 
          handleBuyNow={handleBuyNow}
        />
      ))}
    </div>
  );
}

export default ProductList;
