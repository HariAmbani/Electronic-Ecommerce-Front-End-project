import { Image, Tabs } from "antd";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import logo from "../assets/file.png";

function LoginPage() {
  const loginPageStyle = {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#f0f2f5", // Full page background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    minHeight: "360px", // Keeps the form container consistent
  };

  return (
    <div style={loginPageStyle}>
      <Image src={logo} preview={false} height="200px" style={{ marginBottom: 24 }} />
      <div style={cardStyle}>
        <Tabs centered>
          <Tabs.TabPane tab="Login" key="1">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Signup" key="2">
            <SignupForm />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
