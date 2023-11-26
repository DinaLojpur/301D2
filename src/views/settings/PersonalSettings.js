import React from 'react';
import {
  Button,
  Row,
  Col,
  Label,
  FormGroup,
} from 'reactstrap';

import { Formik, Form, Field } from 'formik';

const PersonalSettingsComponent = () => {

    return (
        <Row>
            <Col sm="12">
            <Formik
                render={() => (
                <Form>
                <Row> 
                    <Col>
                    <FormGroup controlId="file" className='mb-3'>
                        <Label>Profile Picture</Label>
                        <div className="m-0">
                        <input className="d-none" type="file"/>
                        <button className="btn btn-info" type="button"><i className="bi bi-upload"></i> Upload</button>
                        </div>
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <Label>First Name</Label>
                        <Field
                        name="first-name"
                        type="text"
                        className='form-control'
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className='mb-3' controlId="formBasicEmail">
                        <Label>Last Name</Label>
                        <Field
                        name="last-name"
                        type="text"
                        className="form-control"
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className='mb-3' controlId="formBasicEmail">
                        <Label>Display Name</Label>
                        <Field
                        name="display-name"
                        type="text"
                        className="form-control"
                        />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup className='mb-3' controlId="formBasicEmail">
                        <Label>Email</Label>
                        <Field
                        name="email"
                        type="text"
                        className="form-control"
                        />
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className='mb-3' controlId="formGridTime">
                        <Label>Time Zone</Label>
                        <Field name="time-zone" as="select" className="form-control">
                            <option>Choose...</option>
                            <option>...</option>
                        </Field>
                    </FormGroup>
                    </Col>
                    <FormGroup>
                    <div className='btn btn-info'>
                        <Button type="submit" color="info" className="btn">
                        Update
                        </Button>
                    </div>
                    </FormGroup>
                </Row>
                </Form>
                )}
            />
            </Col>
        </Row>
    );
};

export default PersonalSettingsComponent;