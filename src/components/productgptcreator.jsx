import React, { useContext, useState } from 'react';
import { ProductsContext } from '../Data/ProductDetails';
import { Form, Input, InputNumber, Button, notification, Upload } from 'antd';
import { CreateProductInDB } from '../DBoperations/ProductDBoperations';

const ProductCreator = () => {
  const { addProduct } = useContext(ProductsContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setUploadedFile(newFileList[0].originFileObj);
    } else {
      setUploadedFile(null);
    }
  };

  const handleSubmit = async (values) => {
    if (!uploadedFile) {
      notification.error({
        message: 'Upload Required',
        description: 'Please upload a product photo before submitting.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('features', values.features);
    formData.append('price', values.price);
    formData.append('productPhotoName', uploadedFile.name);
    formData.append('productPhoto', uploadedFile);

    try {
      addProduct(formData); // Update local context
      await CreateProductInDB(formData); // Save to DB

      notification.success({
        message: 'Product Added',
        description: `${values.name} has been added successfully!`,
      });

      form.resetFields();
      setFileList([]);
      setUploadedFile(null);
    } catch (error) {
      notification.error({
        message: 'Error Adding Product',
        description: 'Something went wrong while adding the product.',
      });
      console.error("Add product error:", error);
    }
  };

  return (
    <div style={{ maxWidth: '100%', width: '100%', backgroundColor: 'white', padding: '20px', boxSizing: 'border-box', borderRadius: '8px' }}>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Product Creator</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Features"
          name="features"
          rules={[{ required: true, message: 'Please input the product features!' }]}
        >
          <Input placeholder="Enter product features (comma-separated)" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: 'Please input the product price!' },
            { type: 'number', transform: value => Number(value), message: 'Price must be a number!' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter product price" min={0} />
        </Form.Item>

        <Form.Item
          label="Product Photo"
          name="productPhoto"
          rules={[{ required: true, message: 'Please upload a product photo!' }]}
          valuePropName="fileList"
          getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button>Upload Product Photo</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreator;
