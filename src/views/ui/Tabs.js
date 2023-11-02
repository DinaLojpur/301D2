import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Label,
  FormGroup,
} from 'reactstrap';

import { Formik, Form, Field } from 'formik';
//import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';



const JumbotronComponent = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      {/*<BreadCrumbs />*/}
      <ComponentCard title="Settings">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Personal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
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
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
