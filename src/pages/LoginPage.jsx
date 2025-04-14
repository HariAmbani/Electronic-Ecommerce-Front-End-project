import { Image, Tabs } from "antd";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import logo from "../assets/logotwo.png";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("1");

  const loginPageStyle = {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  };

  const logoStyle = {
    width: "400px",
    height: "auto",
    marginRight: "50px", // Space between logo and form
  };

  const formContainerStyle = {
    width: "50%", // Adjust width as needed
    paddingTop: "5px",
    paddingBottom: "0px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Center items horizontally
  };

  return (
    <div style={loginPageStyle}>
      <Image src={logo} preview={false} style={logoStyle} />
      <div style={formContainerStyle}>
        <Tabs centered activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Login" key="1">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Signup" key="2">
            <SignupForm switchToLoginTab={() => setActiveTab("1")} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
