import { useState } from "react";
import { Form, Button, Input, Checkbox } from "antd";
import {Container } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import {
  isValidBusinessEmail,
  successNotification,
  errorNotification
} from "../../utils";
import CountrySelect from "./CountrySelect";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import {useAxios} from "../../utils/AxiosProvider";

export default function Register() {
  const client = useAxios();
  const [registerUserInput, setRegisterUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUserInputChange = (changedValues) =>
    setRegisterUserInput({ ...registerUserInput, ...changedValues });

  const handleRegister = () => {
    const { confirmPassword, ...registerUserInputData } = registerUserInput;
    setLoading(true);
    client.post(
        '/register',
        {...registerUserInputData, country_code: registerUserInputData.country_code.label}
    ).then(() => {
        setLoading(false);
        successNotification("Registration Successful. Redirecting to login.");
        navigate("/auth/login");
    }).catch((err) => {
        setLoading(false);
        errorNotification("Error", err.response.data);
    })
  };

  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  return (
    <div className="loginBox">
        <LeftBg className="position-absolute left bottom-0" />
        <RightBg className="position-absolute end-0 top" />
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-12 mx-auto px-4">
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
                    
                    <Form.Item name="first_name" label="First Name">
                    <Input
                        required
                        autoFocus
                        placeholder="Enter your first name"
                        maxLength={50}
                    />
                    </Form.Item>
                    
                    <Form.Item name="last_name" label="Last Name">
                    <Input
                        required
                        autoFocus
                        placeholder="Enter your last name"
                        maxLength={50}
                    />
                    </Form.Item>
                    
                    <Form.Item name="username" label="Username">
                    <Input
                        required
                        autoFocus
                        placeholder="Enter your username"
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
                        placeholder="Corporate email"
                        maxLength={50}
                    />
                    </Form.Item>

                    <Form.Item name="country_code" label="Country Code">
                    <CountrySelect
                        value={selectedCountryCode}
                        onChange={(value) => setSelectedCountryCode(value)}
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
        </Container>
    </div>
  );
}
