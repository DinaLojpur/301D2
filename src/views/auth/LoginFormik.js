import { React, useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useApolloClient } from "@apollo/client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
//import AuthLogo from "../../layouts/logo/AuthLogo";
import BackgroundImage from '../../assets/images/bg/login-bg.png'
import LoginLogo from '../../assets/images/bg/login-logo.png'



import { LOGIN_MUTATION } from "../../utils/graphqlQueries";
import { errorNotification } from "../../utils";



const LoginFormik = () => {
  const client = useApolloClient();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

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
    <div className="loginBox" style={{ backgroundImage: `url(${BackgroundImage})` }}>

      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <img src={LoginLogo} alt=''/>
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-4 text-center">Login</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                  render={({ errors, touched, handleChange }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                          placeholder="Enter Business Email"
                          onChange={(e) => {
                            handleChange(e);
                            setCredentials({ ...credentials, email: e.target.value });}}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                          placeholder="Enter Password"
                          onChange={(e) => {
                            handleChange(e);
                            setCredentials({ ...credentials, password: e.target.value });
                          }}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Password?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <div className='d-grid gap-2'>
                          <Button type="submit" color="primary" className="btn" loading={loading}>
                            Login
                          </Button>
                        </div>
                      </FormGroup>
                    </Form>
                  )}
                />
                  <h6 className='text-center fw-normal mb-n2'>Don&apos;t have an account? <Link to="/auth/registerformik">Register</Link></h6>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
