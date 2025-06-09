import React from "react";
import { Table, Button, Typography } from "antd";
import moment from "moment";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

const OrderCard = ({ product, setOrderItems }) => {
  console.log("OrderCard product:", product);  // ✅ Add here
  const handleCancelOrder = () => {
    setOrderItems((prevItems) => prevItems.filter(item => item.name !== product.name));
  };

  const deliveryDate = moment().add(2, "days").format("MMM Do YYYY");

  const columns = [
    {
      title: "Product Photo",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ height: "80px", objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (date) => (
        <div>
          <Text strong>Delivery Date: {date}</Text>
          <br />
          <Text strong>Will be delivered in just 2 days</Text>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="primary"
          danger
          icon={<CloseCircleOutlined />}
          onClick={handleCancelOrder}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: product.name,
      image: `http://localhost:3015/productPictures/${product.filename}`,
      name: product.name,
      deliveryDate,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ margin: "16px auto", maxWidth: "800px" }}
    />
  );
};

export default OrderCard;
