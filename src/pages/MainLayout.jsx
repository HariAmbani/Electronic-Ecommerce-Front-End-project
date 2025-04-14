import { Avatar, Button, Image, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import logo from "../assets/logotwo.png";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  DropboxOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import AdminPage from "./AdminPage";
import ProductsProvider from "../Data/ProductDetails";
import HelpPage from "./HelpPage";

function MainLayout({ cartItems, setCartItems }) {
  const { userData, isLoggedIn, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false); // State to track Sider collapse
  const [orderItems, setOrderItems] = useState([]); // State for orders

  const { fullname, role } = userData;

  return isLoggedIn ? (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image width="75px" src={logo} preview={false} />
        <h1 style={{ margin: 0 }}>Electronics Ecommerce Website</h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Custom Circle with First Letter */}
          <div
            className="hover-target"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#1677ff", // Soft blue
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: 600,
              cursor: "pointer",
              position: "relative",
            }}
          >
            {fullname ? fullname[0].toUpperCase() : "U"}

            {/* Hover Content: Full Name and Role */}
            <div
              style={{
                position: "absolute",
                left: "-220px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#ffffff",
                color: "#333",
                padding: "8px 12px",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                opacity: 0,
                visibility: "hidden",
                transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",
                zIndex: 10,
              }}
              className="hover-info"
            >
              {fullname} — {role}
            </div>
          </div>

          <Button type="primary" danger onClick={logout}>
            Logout
          </Button>
        </div>
      </Header>

      {/* Main Content Area */}

      <Layout>
        {/* Sider */}
        <Sider
          collapsible
          width={200}
          style={{ height: "calc(100vh - 64px)", position: "fixed" }}
          breakpoint="lg"
          collapsedWidth="80"
          onCollapse={(collapsed) => setCollapsed(collapsed)} // Track collapse state
        >
          <Menu theme="dark" mode="inline" style={{ fontSize: "16px", padding: "10px 0" }}>
            <Menu.Item key="1" icon={<HomeOutlined style={{ fontSize: "18px" }} />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined style={{ fontSize: "18px" }} />}>
              <Link to="/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined style={{ fontSize: "18px" }} />}>
              <Link to="/cart">Your Cart</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DropboxOutlined style={{ fontSize: "18px" }} />}>
              <Link to="/orders">Your Orders</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<QuestionCircleFilled style={{ fontSize: "18px" }} />}>
              <Link to="/help">Help</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Content */}
        <Content
          style={{
            padding: "24px",
            backgroundColor: "#F1F1F1",
            marginLeft: collapsed ? 80 : 200, // Adjust based on collapsed state
            overflowY: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <ProductsProvider>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  orderItems={orderItems}
                  setOrderItems={setOrderItems} // Pass setOrderItems to HomePage
                />
              }
            />
            <Route
              path="/admin"
              element={<AdminPage />} />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} setCartItems={setCartItems} setOrderItems={setOrderItems} />}
            />
            <Route
              path="/orders"
              element={<OrderPage orderItems={orderItems} setOrderItems={setOrderItems} />} // Pass setOrderItems to OrderPage
            />
            <Route path="/help" element={<HelpPage></HelpPage>} />
          </Routes>
          </ProductsProvider>
        </Content>
      </Layout>

      {/* Footer */}
      {/*<Footer style={{ textAlign: "center", height: "10px" }}>Footer</Footer>*/}
    </Layout>
  ) : (
    <LoginPage />
  );
}

export default MainLayout;
