// pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, notification, Empty } from 'antd';
import CartCard from '../components/CartCard';
import { getUserCart, RemoveFromCart } from '../DBoperations/ProductDBoperations';

const { Title } = Typography;

const CartPage = ({ username: propsUsername, setOrderItems }) => {
    const [username, setUsername] = useState(propsUsername || sessionStorage.getItem("username"));
    const [cartItems, setCartItems] = useState([]);

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

    const handleBuyNow = (product) => {
        setOrderItems([product]);
        notification.success({
            message: "Order Placed",
            description: "Your order has been placed successfully!",
            placement: "topRight",
        });
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
