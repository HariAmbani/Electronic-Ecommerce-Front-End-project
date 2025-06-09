import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Empty, notification, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { GetUserOrders, CancelOrder } from "../DBoperations/ProductDBoperations";

const { Text } = Typography;

// Mapping of Indian states to estimated delivery days
const deliveryDaysByState = {
  "Tamil Nadu": 1,
  "Kerala": 1,
  "Karnataka": 1,
  "Andhra Pradesh": 1,
  "Telangana": 1,
  "Goa": 2,
  "Maharashtra": 2,
  "Gujarat": 2,
  "Madhya Pradesh": 2,
  "Odisha": 3,
  "West Bengal": 3,
  "Chhattisgarh": 3,
  "Uttar Pradesh": 4,
  "Rajasthan": 4,
  "Punjab": 4,
  "Haryana": 4,
  "Delhi": 4,
  "Bihar": 4,
  "Jharkhand": 4,
  "Assam": 4,
  "Arunachal Pradesh": 5,
  "Nagaland": 5,
  "Manipur": 5,
  "Mizoram": 5,
  "Meghalaya": 5,
  "Tripura": 5,
  "Sikkim": 5,
  "Himachal Pradesh": 5,
  "Uttarakhand": 5,
};

const OrderPage = ({ username: propsUsername }) => {
  const [username, setUsername] = useState(propsUsername || sessionStorage.getItem("username"));
  const [orderItems, setOrderItems] = useState([]);

  const userState = sessionStorage.getItem("state") || "Tamil Nadu";

  useEffect(() => {
    if (!username) {
      notification.error({ message: "No username found. Please log in again." });
      return;
    }

    const fetchOrders = async () => {
      try {
        const result = await GetUserOrders(username);
        const enrichedData = result.map(order => ({
          ...order.product,
          orderId: order.orderId,
          productId: order.productId,
          filename: order.product.filename,
          orderPlacedAt: order.createdAt,
          status: order.status,
        }));
        setOrderItems(enrichedData);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        notification.error({ message: "Failed to fetch orders" });
      }
    };

    fetchOrders();
  }, [username]);

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await CancelOrder(username, orderId);
      notification.success({ message: result.message || "Order cancelled" });
      setOrderItems((prev) => prev.filter(item => item.orderId !== orderId));
    } catch (error) {
      console.error("❌ Error cancelling order:", error);
      notification.error({ message: "Failed to cancel order" });
    }
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
      title: "Date of Order Placed",
      dataIndex: "orderPlacedAt",
      key: "orderPlacedAt",
      align: "center",
      render: (date) => (
        <Text strong style={{ fontSize: "16px", color: "#555" }}>
          {moment(date).format("MMM Do YYYY, h:mm A")}
        </Text>
      ),
    },
    {
      title: "Date of Delivery",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      align: "center",
      render: (_, record) => (
        <div>
          <Text strong style={{ color: "#4caf50", fontSize: "16px" }}>
            {record.deliveryDate}
          </Text>
          <br />
          {record.deliveryDays === 1 ? (
            <Text strong style={{ fontSize: "16px", color: "#000000" }}>
              Will be delivered <span style={{ color: "#1e88e5" }}>tomorrow !!</span>
            </Text>
          ) : (
            <Text strong style={{ fontSize: "16px", color: "#000000" }}>
              Will be delivered in just {record.deliveryDays} days
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const color =
          status === "Pending" ? "orange" :
          status === "Shipped" ? "blue" :
          status === "Delivered" ? "green" :
          status === "Cancelled" ? "red" : "default";

        return (
          <Tag color={color} style={{ fontSize: "15px", padding: "5px 10px" }}>
            {status}
          </Tag>
        );
      }
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
          onClick={() => handleCancelOrder(record.orderId)}
          style={{ borderRadius: "4px" }}
        >
          Cancel Order
        </Button>
      ),
    },
  ];

  const data = orderItems.map((product, index) => {
    const deliveryDays = deliveryDaysByState[userState] || 3;
    const deliveryDate = moment(product.orderPlacedAt).add(deliveryDays, "days");

    return {
      key: index,
      orderId: product.orderId,
      image: `http://localhost:3015/productPictures/${product.filename}`,
      name: product.name,
      deliveryDate: deliveryDate.format("MMM Do YYYY"),
      orderPlacedAt: product.orderPlacedAt,
      status: product.status,
      productId: product.productId,
      deliveryDays
    };
  });

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
            width: "98%",
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
            padding: "100px 50px",
            textAlign: "center",
            marginTop: "7%",
          }}
        />
      )}
    </div>
  );
};

export default OrderPage;
