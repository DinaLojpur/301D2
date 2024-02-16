import React, { useState, useEffect, useContext} from 'react';
import UserContext from '../profile/UserContext';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import { useNavigate } from 'react-router-dom';


const ViewProfileComponent = () => {
  const [activeTab, setActiveTab] = useState('2');
  const navigate = useNavigate();
  const { mockUserData } = useContext(UserContext);
  const [userData, setUserData] = useState(mockUserData)

useEffect(() => {
    setUserData(mockUserData);
  }, [mockUserData]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleEdit = () => {
    navigate('/ui/tabs');
  }

  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                <img src={userData.photo} className="rounded-circle" width="150" alt="" />
                <CardTitle tag="h4" className="mt-2 mb-0">
                {userData.first_name + ' ' + userData.last_name}
                </CardTitle>
                <CardSubtitle className="text-muted">Accessibility Tester</CardSubtitle>
              </div>
            </CardBody>
            <CardBody className="border-top p-4">
              <div>
                <CardSubtitle className="text-muted fs-5">Total Number of Scans</CardSubtitle>
                <CardTitle tag="h5">{mockUserData.number_of_scans}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Company</CardSubtitle>
                <CardTitle tag="h5">{mockUserData.company}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Member Since</CardSubtitle>
                <CardTitle tag="h5">{mockUserData.since}</CardTitle>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="12" lg="8">
          <Card>
            <Nav tabs>
              
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Profile
                </NavLink>
              </NavItem>
              
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="2">
                <div className="p-4">
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>First Name</Label>
                    <Input
                        name="first-name"
                        type="text"
                        value={userData.first_name}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>Last Name</Label>
                    <Input
                        name="first-name"
                        type="text"
                        value={userData.last_name}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>Username</Label>
                    <Input
                        name="username"
                        type="text"
                        value={userData.username}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="text"
                        value={userData.email}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>Phone</Label>
                    <Input
                        name="phone"
                        type="text"
                        value={mockUserData.phone}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm="12" md="12">
                    <FormGroup className="mb-3">
                    <Label>Time Zone</Label>
                    <Input
                        name="time-zone"
                        type="text"
                        value={userData.timezone}
                        className="form-control"
                        disabled
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Button color="info" htmlType="submit" onClick={handleEdit}>
                        Edit profile
                </Button>
        
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewProfileComponent;