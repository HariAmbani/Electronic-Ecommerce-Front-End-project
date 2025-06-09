// pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, notification, Empty, Modal } from 'antd';
import CartCard from '../components/CartCard';
import { getUserCart, RemoveFromCart, PlaceOrder, GetUserOrders } from '../DBoperations/ProductDBoperations';

const { Title } = Typography;

const CartPage = ({ username: propsUsername, setOrderItems }) => {
    const [username, setUsername] = useState(propsUsername || sessionStorage.getItem("username"));
    const [cartItems, setCartItems] = useState([]);

    const [userOrders, setUserOrders] = useState([]);
    
    useEffect(() => {
    const fetchOrders = async () => {
        if (username) {
        const orders = await GetUserOrders(username);
        setUserOrders(orders);
        }
    };
    fetchOrders();
    }, [username]);

    useEffect(() => {
        if (!username) {
            notification.error({ message: "No username found. Please log in again." });
            console.error("❌ Username is undefined — cannot load cart.");
            return;
        }

        const fetchCart = async () => {
            console.log("✅ Fetching cart for user:", username);
            const result = await getUserCart(username);
            setCartItems(result);
        };

        fetchCart();
    }, [username]);

    const handleRemove = async (product) => {
        try {
            const result = await RemoveFromCart(username, product.productId);

            notification.success({ message: result.message });
            
            // Update state: remove item from UI
            setCartItems((prev) => prev.filter(item => item.productId !== product.productId));
        } catch (error) {
            console.error("❌ Error removing product:", error);
            notification.error({ message: "Error removing product from cart" });
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

  if (alreadyOrdered) {
    Modal.confirm({
      title: "Product Already Ordered",
      content: `${product.name} has already been ordered recently and is currently "${alreadyOrdered.status}". Do you still want to order it again?`,
      okText: "Proceed with Order",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await PlaceOrder(username, product.productId);
          setOrderItems((prev) => [...prev, product]);
          notification.success({
            message: "Order Placed",
            description: `${product.name} has been ordered successfully!`,
            placement: "topRight",
          });
        } catch (error) {
          console.error("❌ Order failed:", error);
          notification.error({
            message: "Order Failed",
            description: error.message || "Could not place the order.",
          });
        }
      },
    });
    return;
  }

  // Normal order flow if no duplicate
  try {
    const res = await PlaceOrder(username, product.productId);
    setOrderItems((prev) => [...prev, product]);
    notification.success({
      message: "Order Placed",
      description: `${product.name} has been ordered successfully!`,
      placement: "topRight",
    });
  } catch (error) {
    console.error("❌ Order failed:", error);
    notification.error({
      message: "Order Failed",
      description: error.message || "Could not place the order.",
    });
  }
};

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2} style={{ textAlign: 'center' }}>Your Shopping Cart</Title>
            {cartItems.length === 0 ? (
                <Empty description="Your cart is empty" />
            ) : (
                <Row
                    gutter={[16, 16]}
                    justify={cartItems.length < 3 ? "center" : "start"}
                    style={{ marginTop: "24px" }}
                >
                    {cartItems.map((item) => (
                        <Col key={item.productId} xs={24} sm={12} md={8}>
                            <CartCard
                                product={item.product}
                                handleRemove={handleRemove}
                                handleBuyNow={handleBuyNow}
                                createdAt={item.createdAt}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default CartPage;
