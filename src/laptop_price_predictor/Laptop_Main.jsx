import React from "react";
import { Form, Input, Button, Card, Typography, Row, Col } from "antd";

const { Title } = Typography;

export default function LaptopPricePredictorForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Make API call to predict price here
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
    <div style={{
      minHeight: "100vh",
      background: "#f0f4ff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <Title level={2} style={{
        color: "#0050b3",
        marginBottom: 24,
        textAlign: "center",
        fontWeight: 900,
      }}>
        <b>AI-Powered Laptop Price Prediction Engine</b>
      </Title>
      <Card style={{
        width: "90%",
        backgroundColor: "#ffffff",
        border: "1px solid #91d5ff",
        boxShadow: "0 0 30px rgba(0, 100, 255, 0.1)",
        color: "#002766",
        borderRadius: 12,
      }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            {fields.map((field) => (
              <Col xs={24} sm={12} md={6} key={field}>
                <Form.Item
                  name={field}
                  label={<span style={{ color: "#0050b3", fontSize: "16px" }}>{field.replace(/_/g, " ")}</span>}
                  rules={[{ required: true, message: `Please enter ${field}` }]}
                >
                  <Input
                    placeholder={`Enter ${field.replace(/_/g, " ")}`}
                    style={{
                        backgroundColor: "#f0f5ff",
                        color: "#000000", // Text color
                        borderColor: "#91d5ff",
                        borderRadius: 6,
                        fontSize: "16px",
                        fontWeight: 500,
                    }}
                    className="dark-placeholder"
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
                backgroundColor: "#1890ff",
                color: "#fff",
                fontWeight: 700,
                border: "none",
                boxShadow: "0 0 10px #91d5ff",
                borderRadius: 6,
                fontSize: "16px",
                padding: "6px 24px"
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