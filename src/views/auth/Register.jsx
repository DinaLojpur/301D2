import { useState } from "react";
import { Form, Button, Input, Checkbox } from "antd";
import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
  isValidBusinessEmail,
  successNotification,
  errorNotification
} from "../../utils";
import { REGISTER_USER_MUTATION } from "../../utils/graphqlQueries";

export default function Register() {
  const client = useApolloClient();
  const [registerUserInput, setRegisterUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUserInputChange = (changedValues) =>
    setRegisterUserInput({ ...registerUserInput, ...changedValues });

  const handleRegister = () => {
    const { confirmPassword, ...registerUserInputData } = registerUserInput;
    setLoading(true);
    client
      .mutate({
        mutation: REGISTER_USER_MUTATION,
        variables: { data: registerUserInputData }
      })
      .then(() => {
        setLoading(false);
        successNotification("Registration Successful. Redirecting to login.");
        navigate("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        errorNotification("Error", err.message);
      });
  };
  

  return (
    <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-5 mx-auto px-4">
            <Form
                name="register"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleRegister}
                autoComplete="off"
                onValuesChange={handleRegisterUserInputChange}
                requiredMark
                className="px-4 pt-4 pb-2 border rounded bg-white shadow"
            >
                <h4 className="text-center mb-0">Register</h4>
                <Form.Item name="name" label="Name">
                <Input
                    required
                    autoFocus
                    placeholder="Enter your name"
                    maxLength={50}
                />
                </Form.Item>
                <Form.Item
                label="Email"
                name="email"
                // help="*Report will be sent to this email"
                hasFeedback
                rules={[
                    {
                    validator: async (_, email) => {
                        if (!isValidBusinessEmail(email)) {
                        throw new Error("Please enter a valid business email");
                        }
                    }
                    }
                ]}
                >
                <Input
                    required
                    placeholder="Enter your business email"
                    maxLength={50}
                />
                </Form.Item>
                <Form.Item name="phone" label="Contact Phone">
                <Input
                    type="tel"
                    required
                    placeholder="Enter your contact phone"
                    maxLength={20}
                />
                </Form.Item>
                <Form.Item name="address" label="Address">
                <Input required placeholder="Enter your address" maxLength={100} />
                </Form.Item>
                <Form.Item name="country" label="Country">
                <Input required placeholder="Enter your country" maxLength={50} />
                </Form.Item>
                <Form.Item name="company" label="Company">
                <Input required placeholder="Enter your company" maxLength={50} />
                </Form.Item>
                <Form.Item name="password" label="Password">
                <Input.Password
                    required
                    placeholder="Please choose a strong password"
                    maxLength={50}
                />
                </Form.Item>
                <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                    validator: async (_, confirmPassword) => {
                        if (confirmPassword !== registerUserInput?.password) {
                        throw new Error("Passwords do not match");
                        }
                    }
                    }
                ]}
                >
                <Input.Password
                    required
                    placeholder="Confirm your password"
                    maxLength={50}
                />
                </Form.Item>
                {/* form item with checkbox */}
                <Form.Item className="text-center mt-1 mb-1">
                <Checkbox required>
                    I agree to the <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>
                </Checkbox>
                </Form.Item>
                <Form.Item className="text-center mt-1 mb-1">
                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
                <Form.Item className="text-center mt-1 mb-1">
                    Already have an account? <Link to="/auth/login">Login</Link>
                </Form.Item>
                </Form.Item>
            </Form>
            </div>
        </div>
    </div>
  );
}
