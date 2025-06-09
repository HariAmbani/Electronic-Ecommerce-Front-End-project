import React, { useState, useEffect } from 'react';
import { Table, Image, Button, notification, Modal, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllProductsFromDB, UpdateProductInDB, DeleteProductFromDB } from '../DBoperations/ProductDBoperations';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newName, setNewName] = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProductsFromDB();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const confirmDelete = (productId, productName) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: `${productName} will be permanently removed.`,
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: () => deleteProduct(productId, productName),
      okButtonProps: {
        style: {
          backgroundColor: '#ff4d4f',   // AntD danger red
          borderColor: '#ff4d4f',
          color: 'white',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#1677ff',  // AntD primary blue
          borderColor: '#1677ff',
          color: 'white',
        },
      },
    });
  };

  const showEditModal = (product) => {
    setCurrentProduct(product);
    setNewName(product.name);
    setNewFeatures(product.features.join(', '));
    setNewPrice(product.price);
    setNewImageFile(null);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!currentProduct) return;

    const formData = new FormData();
    formData.append('name', newName);
    formData.append('features', JSON.stringify(newFeatures.split(',').map(f => f.trim())));
    formData.append('price', newPrice);

    if (newImageFile) {
      formData.append('file', newImageFile);
      formData.append('filename', newImageFile.name);
    }

    try {
      const result = await UpdateProductInDB(currentProduct.productId, formData);

      if (result.updatedProduct) {
        notification.success({
          message: 'Product Updated',
          description: `${newName} has been updated successfully!`,
        });

        fetchProducts();
        setIsModalVisible(false);
      } else {
        notification.info({
          message: 'No Changes Detected',
          description: 'The submitted data matches the existing product. No update made.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: 'An error occurred while updating the product.',
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

const deleteProduct = async (productId, productName) => {
  try {
    const result = await DeleteProductFromDB(productId);

    if (result.message?.toLowerCase().includes('deleted')) {
      setProducts((prev) =>
        prev.filter((product) => product.productId !== productId)
      );

      notification.success({
        message: 'Product Deleted',
        description: `${productName} has been deleted successfully!`,
      });
    } else {
      notification.error({
        message: 'Deletion Failed',
        description: result.message || 'Could not delete product.',
      });
    }
  } catch (err) {
    notification.error({
      message: 'Server Error',
      description: 'An error occurred while deleting the product.',
    });
  }
};


  const handleImageChange = ({ file }) => {
    setNewImageFile(file);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'filename',
      key: 'filename',
      render: (text) => (
        <Image
          src={`http://localhost:3015/productPictures/${text}`}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: '5px' }}
          preview={true}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features) =>
        features?.length ? features.map((f, i) => (
          <div key={i}>- {f}</div>
        )) : 'No features'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `₹${text}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showEditModal(record)}
            style={{ marginRight: '8px' }}
          >
            Edit Product
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDelete(record.productId, record.name)}
          >
            Delete Product
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="productId"
        bordered
        pagination={{ pageSize: 4 }}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title="Edit Product"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Product Name"
          style={{ marginBottom: '10px' }}
        />
        <Input
          value={newFeatures}
          onChange={(e) => setNewFeatures(e.target.value)}
          placeholder="Features (comma separated)"
          style={{ marginBottom: '10px' }}
        />
        <Input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Price"
          style={{ marginBottom: '10px' }}
        />
        <div style={{ marginBottom: '10px' }}>
          <Upload beforeUpload={() => false} onChange={handleImageChange} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
          {newImageFile ? (
            <div style={{ marginTop: '10px' }}>
              <Image
                src={URL.createObjectURL(newImageFile)}
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '5px' }}
              />
            </div>
          ) : (
            currentProduct?.filename && (
              <div style={{ marginTop: '10px' }}>
                <Image
                  src={`http://localhost:3015/productPictures/${currentProduct.filename}`}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
              </div>
            )
          )}
        </div>
      </Modal>
    </>
  );
};

export default ProductTable;
