import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { userApi } from "../services/api";

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const userLogin = useUserStore((state) => state.login);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // 调用API服务进行登录
      const response = await userApi.login(values.username, values.password);
      const { user, token } = response.data;

      // 更新authStore
      login(user, token);

      // 更新userStore
      userLogin({
        id: user.id,
        username: user.username,
      });

      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error("Login failed. Please check your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
        width: "100vw",
      }}
    >
      <Spin spinning={loading}>
        <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title level={2}>Elderly Fall Detection System</Title>
            <Title level={4}>Login</Title>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <span>Don't have an account yet? </span>
              <Link to="/register">Register immediately! </Link>
            </div>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
