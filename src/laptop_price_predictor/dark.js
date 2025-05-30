import React from "react";
import { Form, Input, Button, Card, Typography, Row, Col } from "antd";
import "../App.css"; // Make sure to include global CSS for placeholder color
import { message } from "antd"; // make sure this is imported at the top

const { Title } = Typography;

export default function LaptopPricePredictorForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
const onFinish = async (values) => {
  try {
    const response = await fetch("http://localhost:3015/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (response.ok) {
      message.success(result.price); // show result in a popup
    } else {
      message.error(result.error || "Prediction failed.");
    }
  } catch (error) {
    message.error("Server not responding or network error.");
    console.error("Prediction error:", error);
  }
};

  };

  const fields = [
    "Brand",
    "Processor_Name",
    "Processor_Brand",
    "processor_power",
    "processor_gen",
    "processor_series",
    "RAM(GB)",
    "RAM_Expandable",
    "RAM_TYPE",
    "SSD_Capacity",
    "Display_type",
    "Display_size",
    "GPU",
    "GPU_Details",
    "GPU_Brand",
    "Focused",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#00ff88",
        fontFamily: "'Courier New', monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Title
        level={2}
        style={{
          color: "#00ff88",
          marginBottom: 24,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 10px #00ff88",
        }}
      >
        ML-Powered Laptop Price Predictor
      </Title>

      <Card
        style={{
          width: "95%",
          backgroundColor: "#1a1a1a",
          border: "1px solid #00ff88",
          boxShadow: "0 0 25px #00ff88",
          borderRadius: 12,
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            {fields.map((field) => (
              <Col xs={24} sm={12} md={6} key={field}>
                <Form.Item
                  name={field}
                  label={
                    <span
                      style={{
                        color: "#00ff88",
                        fontSize: "16px",
                      }}
                    >
                      {field.replace(/_/g, " ")}
                    </span>
                  }
                  rules={[{ required: true, message: `Please enter ${field}` }]}
                >
                  <Input
                    placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    style={{
                      backgroundColor: "#000000",
                      color: "#00ff88",
                      borderColor: "#00ff88",
                      borderRadius: 6,
                      fontSize: "15px",
                      fontFamily: "'Courier New', monospace",
                    }}
                    className="green-placeholder"
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item style={{ textAlign: "center", marginTop: 60 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#00ff88",
                color: "#0d0d0d",
                fontWeight: 700,
                border: "none",
                borderRadius: 6,
                fontSize: "16px",
                padding: "8px 24px",
                boxShadow: "0 0 15px #00ff88",
                fontFamily: "'Courier New', monospace",
              }}
            >
              Predict Price
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
