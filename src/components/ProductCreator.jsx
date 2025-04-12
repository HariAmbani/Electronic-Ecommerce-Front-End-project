import React, { useState, useContext } from 'react';
import { ProductsContext } from '../Data/ProductDetails';
import { Form, Input, InputNumber, Button, notification, Modal, Row, Col, Image } from 'antd';
import { CreateProductInDB } from '../DBoperations/ProductDBoperations';

// Import images directly
import productimage1 from "../assets/product 1 samsung phone.jpg";
import productimage2 from "../assets/product 2 asus laptop.jpg";
import productimage3 from "../assets/product 3 sony headphones.webp";
import productimage4 from "../assets/product 4 logitech .jpg";
import productimage5 from "../assets/product 5 samsung watch.jpg"
import productimage6 from "../assets/product 6 apple ipad pro 12.2.jpg"
import productimage7 from "../assets/product 11 sasmung QLED TV.jpg"
import productimage8 from "../assets/product 8 Razer Gaming mouse.jpg"
import productimage9 from "../assets/product 9 WD 2TB.jpg"
import productimage10 from "../assets/product 10 go pro action camera.jpg"
import productimage11 from "../assets/product 7 marshal speakers.jpg"
import productimage12 from "../assets/product 12 DJI drone.jpg"
import productimage13 from "../assets/product 13 logitech gaming mouse.jpg"
import productimage14 from "../assets/product 14 samsung buds 3.jpg"
import productimage15 from "../assets/product 15 BENQ projector.jpg"
import productimage16 from "../assets/product 16 MI powerbank.jpg"


// List of available images
const availableImages = [
  { src: productimage1, alt: 'Samsung Phone' },
  { src: productimage2, alt: 'Asus Laptop' },
  { src: productimage3, alt: 'Sony Headphones' },
  { src: productimage4, alt: 'Logitech' },
  { src: productimage5, alt: 'Aamsung Watch' },
  { src: productimage6, alt: 'Apple Ipad' },
  { src: productimage7, alt: 'Samsung Tv' },
  { src: productimage8, alt: 'Razer Mouse' },
  { src: productimage9, alt: 'WD Hard Disk' },
  { src: productimage10, alt: 'Go Pro Camera' },
  { src: productimage11, alt: 'Marshal Bluetooth Speaker' },
  { src: productimage12, alt: 'DJI Drone' },
  { src: productimage13, alt: 'Logitech Mouse' },
  { src: productimage14, alt: 'Samsung TWS' },
  { src: productimage15, alt: 'BENQ Projector' },
  { src: productimage16, alt: 'MI Powerbank' },
];

const ProductCreator = () => {
  const { addProduct } = useContext(ProductsContext);
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle opening the modal
  const showImageModal = () => {
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle image selection from modal
  const handleImageSelect = (image) => {
    setSelectedImage(image.src);
    setIsModalVisible(false); // Close the modal after selecting the image
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const newProduct = {
      ...values,
      features: values.features.split(',').map((feature) => feature.trim()),
      image: selectedImage || 'https://via.placeholder.com/150', // Fallback if no image is selected
    };

    addProduct(newProduct);
    CreateProductInDB();
    notification.success({
      message: 'Product Added',
      description: `${newProduct.name} has been added successfully!`,
    });

    form.resetFields();
    setSelectedImage(''); // Reset image selection
    CreateProductInDB()
  };

  return (
    <div
      style={{
        maxWidth: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Product Creator</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          image: selectedImage, // Initialize form with the selected image
        }}
      >
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

        <Form.Item label="Select Image" name="image">
          <Button type="dashed" onClick={showImageModal} style={{ width: '100%' }}>
            {selectedImage ? (
              <div>
                <Image
                  src={selectedImage} // Use the selected image directly
                  alt={selectedImage}
                  width={50}
                  height={50}
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
                <span>{selectedImage}</span>
              </div>
            ) : (
              'Click to upload image'
            )}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Product
          </Button>
        </Form.Item>
      </Form>

      {/* Modal to select image */}
      <Modal
        title="Select Product Image"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Row gutter={[16, 16]}>
          {availableImages.map((image, index) => (
            <Col key={index} xs={12} sm={8} md={6}>
              <div
                onClick={() => handleImageSelect(image)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
                <div>{image.alt}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default ProductCreator;
