import React, { useContext, useState } from 'react';
import { ProductsContext } from '../Data/ProductDetails';
import { Form, Input, InputNumber, Button, notification, Upload, Modal } from 'antd';
import { CreateProductInDB } from '../DBoperations/ProductDBoperations';


const ProductCreator = () => {
  const { addProduct } = useContext(ProductsContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({
      productPhoto: newFileList.length > 0 ? newFileList : undefined,
    });
  };


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
  }

  setPreviewImage(file.url || file.preview);
  setPreviewVisible(true);
  setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });

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
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            fileList={fileList}
            onChange={handleUpload}
            onPreview={handlePreview}
            beforeUpload={(file) => {
              const isImage = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type);
              if (!isImage) {
                notification.error({
                  message: 'Invalid File Type',
                  description: 'Only PNG, JPEG, JPG, GIF, or WebP image formats are supported.',
                });
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            customRequest={({ onSuccess }) => {
              setTimeout(() => onSuccess("ok"), 0);
            }}
            listType="picture-card"
            showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
          >
            {fileList.length >= 1 ? null : <Button>Upload</Button>}
          </Upload>
          {/* Fullscreen-style modal preview */}
          {previewImage && (
            <div
              style={{
                display: previewVisible ? 'flex' : 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.85)',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2000
              }}
              onClick={handleCancel}
            >
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <span
                style={{
                  position: 'fixed',
                  top: 20,
                  right: 30,
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white',
                  cursor: 'pointer',
                  zIndex: 2100
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
              >
                ×
              </span>
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Product
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ProductCreator;
