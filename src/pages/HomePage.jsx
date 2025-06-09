import React, { useEffect, useState } from "react";
import { Row, Col, notification } from "antd";
import ProductCard from "../components/ProductCard";
import { getAllProductsFromDB, AddToCart } from "../DBoperations/ProductDBoperations"
import { Typography } from "antd";
const { Title } = Typography;

const HomePage = ({ cartItems, setCartItems, orderItems, setOrderItems }) => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProductsFromDB();
      setProducts(data);
    };

    fetchProducts();

    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

const handleAddToCart = async (product) => {
  if (!username) {
    alert("Please login first!");
    return;
  }

  try {
    await AddToCart(username, product.productId);  // ✅ Call backend API
    setCartItems((prevItems) => [...prevItems, product]);

    notification.success({
      message: "Product Added to Cart",
      description: `${product.name} has been added to your cart.`,
      placement: "topRight",
    });
  } catch (error) {
    console.error("Failed to add to cart:", error);
    notification.error({
      message: "Add to Cart Failed",
      description: error.message,
      placement: "topRight",
    });
  }
};


  const handleBuyNow = (product) => {
    setOrderItems((prevItems) => [...prevItems, product]);
    notification.success({
      message: "Order Placed",
      description: "Your order has been placed successfully!",
      placement: "topRight",
    });
  };

return (
  <div style={{ padding: "24px" }}>
    <Title level={2} style={{ textAlign: 'center' }}>Explore Our Products</Title>
    <Row gutter={[16, 16]} justify="center" style={{ marginTop: "24px" }}>
      {products.map((product, index) => (
        <Col key={index} xs={24} sm={12} md={6}>
          <ProductCard
            key={product._id}
            product={product}
            username={username}
            handleBuyNow={handleBuyNow}
            handleAddToCart={handleAddToCart}
          />
        </Col>
      ))}
    </Row>
  </div>
);
};

export default HomePage;
