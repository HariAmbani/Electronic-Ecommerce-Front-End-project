import React, { useEffect, useState } from "react";
import { Row, Col, notification, Typography, Modal } from "antd";
import ProductCard from "../components/ProductCard";
import {
  getAllProductsFromDB,
  AddToCart,
  PlaceOrder,
  GetUserOrders,
} from "../DBoperations/ProductDBoperations";

const { Title } = Typography;

const HomePage = ({ cartItems, setCartItems, orderItems, setOrderItems }) => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProductsFromDB();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (username) {
        const orders = await GetUserOrders(username);
        setUserOrders(orders);
      }
    };
    fetchOrders();
  }, [username]);

  const handleAddToCart = async (product) => {
    if (!username) {
      alert("Please login first!");
      return;
    }

    try {
      await AddToCart(username, product.productId);
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

  const handleBuyNow = async (product) => {
    if (!username) {
      alert("Please login first!");
      return;
    }

    const alreadyOrdered = userOrders.find(
      (order) =>
        order.productId === product.productId &&
        (order.status === "Pending" || order.status === "Shipping")
    );

    const placeOrderAndNotify = async () => {
      try {
        const res = await PlaceOrder(username, product.productId);
        setOrderItems((prev) => [...prev, product]);
        notification.success({
          message: "Order Placed",
          description: `${product.name} has been ordered successfully!`,
          placement: "topRight",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000); // Refresh after 1 second
      } catch (error) {
        console.error("❌ Order failed:", error);
        notification.error({
          message: "Order Failed",
          description: error.message || "Could not place the order.",
        });
      }
    };

    if (alreadyOrdered) {
      Modal.confirm({
        title: "Product Already Ordered",
        content: `${product.name} has already been ordered recently and is currently "${alreadyOrdered.status}". Do you still want to order it again?`,
        okText: "Proceed with Order",
        cancelText: "Cancel",
        onOk: placeOrderAndNotify,
      });
      return;
    }

    // Normal order flow
    await placeOrderAndNotify();
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Explore Our Products
      </Title>
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
