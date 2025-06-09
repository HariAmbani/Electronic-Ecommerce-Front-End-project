import React from 'react';
import { Card, Button, Typography } from 'antd';
import { CloseCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CartCard = ({ product, handleRemove, handleBuyNow, createdAt }) => {

    return (
        <Card
            hoverable
            style={{
                width: 390,
                margin: '13px auto',
                padding: '24px',  // Adjusted padding for a better look
                paddingBottom: '12px',
                alignItems: 'center',
                textAlign: 'center'
            }}
            cover={
                <img
                    alt={product.name}
                    src={`http://localhost:3015/productPictures/${product.filename}`}
                    style={{ height: '150px', objectFit: 'contain' }}
                />
            }
        >
            {/* Title */}
            <Card.Meta
                title={
                    <Text style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {product.name}
                    </Text>
                    
                }
                description={
                <div>
                    <ul
                    style={{
                        paddingLeft: '16px',
                        listStyle: 'disc',
                        color: '#444',
                        fontWeight: 500,
                    }}
                    >
                    {product.features.map((feature, index) => (
                        <li key={index} style={{ color: '#333' }}>
                        {feature}
                        </li>
                    ))}
                    </ul>

                    <Text style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                    ₹{product.price}
                    </Text>

                    {createdAt && (
                    <Text
                        style={{
                        display: 'block',
                        marginTop: 8,
                        color: '#0E0E10', // subtle professional blue
                        fontWeight: 500,
                        }}
                    >
                        Added on: {new Date(createdAt).toLocaleString()}
                    </Text>
                    )}
                </div>
                }
            />
            {/* Buttons */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row', // changed from 'column'
                    justifyContent: 'center',
                    gap: '16px',
                    marginTop: '16px',
                    alignItems: 'center',
                    flexWrap: 'wrap', // for smaller screens
                }}
                >
                <Button
                    type="primary"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleRemove(product)}
                >
                    Remove from Cart
                </Button>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleBuyNow(product)}
                >
                    Buy Now
                </Button>
            </div>
        </Card>
    );
};

export default CartCard;
