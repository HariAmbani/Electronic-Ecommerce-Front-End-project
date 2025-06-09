import React from "react";
import { Table, Button, Typography, Empty } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text } = Typography;

const OrderPage = ({ orderItems, setOrderItems }) => {
  const handleCancelOrder = (productName) => {
    setOrderItems((prevItems) => prevItems.filter(item => item.name !== productName));
  };

  const columns = [
    {
      title: "Product Photo",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{
            height: "80px",
            width: "80px",
            objectFit: "contain",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (name) => (
        <Text strong style={{ fontSize: "16px" }}>
          {name}
        </Text>
      ),
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      align: "center",
      render: (date) => (
        <div>
          <Text strong style={{ color: "#4caf50", fontSize: "16px" }}>
            Delivery Date: {date}
          </Text>
          <br />
          <Text strong style={{ fontSize: "16px", color: "#555" }}>
            Will be delivered in just 2 days
          </Text>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<CloseCircleOutlined />}
          onClick={() => handleCancelOrder(record.name)}
          style={{ borderRadius: "4px" }}
        >
          Cancel Order
        </Button>
      ),
    },
  ];

  const data = orderItems.map((product, index) => ({
    key: index,
    image: `http://localhost:3015/productPictures/${product.filename}`,
    name: product.name,
    deliveryDate: moment().add(2, "days").format("MMM Do YYYY"),
  }));

  return (
    <div style={{ margin: "20px auto", width: "100%", textAlign: "center" }}>
      {orderItems.length > 0 && (
        <Typography.Title level={3} style={{ marginBottom: "20px" }}>
        Your Orders
      </Typography.Title>
      )}
      
      {orderItems.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          style={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            Width: "98%",
            margin: "0 auto",
          }}
        />
      ) : (
        <Empty
          description={
            <Text strong style={{ fontSize: "20px" }}>
              No Orders Yet...
            </Text>
          }
          style={{
            padding: "100px 50px", // Increase padding
            textAlign: "center", // Align content to the left
            marginTop: "7%", // Push it down vertically
          }}
        />
      )}
    </div>
  );
};

export default OrderPage;
