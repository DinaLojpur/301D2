import { useState } from "react";
import { Form, Button, Input } from "antd";
import { useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LOGIN_MUTATION } from "../../utils/graphqlQueries";
import { errorNotification } from "../../utils";

export default function Login() {
  const client = useApolloClient();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials
      })
      .then(({ data }) => {
        setLoading(false);
        localStorage.setItem("TOKEN", data.login.token);
        localStorage.setItem("USER", JSON.stringify(data.login.user));
        window.location.href = "/";
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        errorNotification("Error", err.message);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="login">
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete="on"
            onValuesChange={(changedValues) =>
              setCredentials({ ...credentials, ...changedValues })
            }
          >
            <h4 className="text-center">Login</h4>
            <Form.Item label="Email" name="email">
              <Input
                prefix={<UserOutlined />}
                required
                placeholder="Enter your email"
                value={credentials.email}
              />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                prefix={<LockOutlined />}
                required
                placeholder="Enter your password"
                value={credentials.password}
              />
            </Form.Item>
            <Form.Item>
              <Link style={{ float: "left" }} to="/resend-verification">
                Account not verified?
              </Link>

              <Link style={{ float: "right" }} to="/forgot-password">
                Forgot password
              </Link>
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
              <Form.Item className="text-center">
                No account yet? <Link to="/auth/register">Register</Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
