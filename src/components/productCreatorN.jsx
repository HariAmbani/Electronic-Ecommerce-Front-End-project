import React, { useContext, useState } from 'react';
import { ProductsContext } from '../Data/ProductDetails';
import { Form, Input, InputNumber, Button, notification, Upload } from 'antd';
import { CreateProductInDB } from '../DBoperations/ProductDBoperations';

const ProductCreator = () => {
  const { addProduct } = useContext(ProductsContext);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
  if (fileList.length === 0) {
    notification.error({
      message: 'Upload Required',
      description: 'Please upload a product image before submitting.'
    });
    return;
  }

  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('features', JSON.stringify(values.features.split(',').map(f => f.trim())));
  formData.append('price', values.price);
  formData.append('filename', fileList[0].originFileObj.name);
  formData.append('file', fileList[0].originFileObj);

  addProduct(formData);
  await CreateProductInDB(formData);

  notification.success({
    message: 'Product Added',
    description: `${values.name} has been added successfully!`,
  });

  form.resetFields();
  setFileList([]);
};


  const [fileList, setFileList] = useState([])
  const handleUpload = ({fileList:newFileList})=>{
    setFileList(newFileList)
    //console.log(fileList[0].originFileObj.name)
  }
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
            { type: 'number', transform: (value) => Number(value), message: 'Price must be a number!' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter product price" min={0} />
        </Form.Item>

        <Form.Item 
          label="Product photo" 
          name="productPhoto"
          rules={[
            { required: true }
          ]}
        >
          <Upload 
          fileList={fileList}
          onChange={handleUpload}
          beforeUpload={()=>false}
          >
            <Button>Upload profile photo</Button>
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
