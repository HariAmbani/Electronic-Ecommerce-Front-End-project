// this is the order card and OrderCard.jsx is the Order Table
import React from "react";
import { Card, Button, Typography } from "antd";
import moment from "moment";
import { CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const OrderCard = ({ product, setOrderItems }) => {
  const handleCancelOrder = () => {
    setOrderItems((prevItems) => prevItems.filter(item => item.name !== product.name));
  };

  const deliveryDate = moment().add(2, "days").format("MMM Do YYYY");

  return (
    <Card hoverable style={{ width: 300, margin: "16px auto", textAlign: "center" }}>
      <img src={`http://localhost:3015/productPictures/${product.filename}`} alt={product.name} style={{ height: 150, objectFit: "contain" }} />
      <Card.Meta
        title={product.name}
        description={
          <div style={{ paddingTop: "10px" }}>
            <Text strong>Delivery Date: {deliveryDate}</Text>
            <br />
            <Text strong>Will be delivered in just 2 days</Text>
            <br />
            <br />
            <Button
              type="primary"
              danger
              onClick={handleCancelOrder}
              icon={<CloseCircleOutlined />}
            >
              Cancel
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default OrderCard;


