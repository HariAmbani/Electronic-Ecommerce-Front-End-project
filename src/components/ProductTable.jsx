import React, { useContext, useState } from 'react';
import { Table, Image, Button, notification, Modal, Input } from 'antd';
import { ProductsContext } from '../Data/ProductDetails';

const ProductTable = ({ products }) => {
  const { setProducts } = useContext(ProductsContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newName, setNewName] = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const showEditModal = (product) => {
    setCurrentProduct(product);
    setNewName(product.productName);
    setNewFeatures(product.productFeatures);
    setNewPrice(product.productPrice);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productName === currentProduct.productName
          ? {
              ...product,
              productName: newName,
              productFeatures: newFeatures,
              productPrice: newPrice,
            }
          : product
      )
    );
    setIsModalVisible(false);
    notification.success({
      message: 'Product Updated',
      description: `${newName} has been updated successfully!`,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteProduct = (productName) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productName !== productName)
    );
    notification.success({
      message: 'Product Deleted',
      description: `${productName} has been deleted successfully!`,
    });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text) => (
        <Image
          src={text}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover', borderRadius: '5px' }}
          preview={false}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Features',
      dataIndex: 'productFeatures',
      key: 'productFeatures',
      render: (features) => {
        if (!features) return 'No features';
        return features.split(',').map((f, index) => (
          <span key={index} style={{ display: 'block' }}>
            - {f.trim()}
          </span>
        ));
      },
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
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
            onClick={() => deleteProduct(record.productName)}
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
        rowKey="productName"
        bordered
        pagination={{ pageSize: 4 }}
        style={{ marginTop: '20px' }}
      />
      <Modal
        title="Edit Product"
        visible={isModalVisible}
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
        />
      </Modal>
    </>
  );
};

export default ProductTable;
