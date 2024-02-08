import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, FormGroup, Row, Col, Form } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import {useAxios} from "../../utils/AxiosProvider";

const NewUser = ({ isOpen, toggle }) => {
  const [isActive, setIsActive] = useState(false);
  const initialValues = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  }
  const client = useAxios();

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked); // toggle value when checkbox changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      console.log(formData.get('userName'));
      console.log(formData.get('firstName'));
      console.log(formData.get('lastName'));
      console.log(formData.get('email'));
      console.log(formData.get('role'));
      console.log('isActive:', isActive);
      const newUser = {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        username: formData.get('userName'),
        email: formData.get('email'),

      }
      // send new user to endpoint
      await client.post('/register', newUser);
      setIsActive(false);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error submitting Project:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered backdrop="static">
      <ModalHeader>New User Details</ModalHeader>
      <ModalBody>
        <Form initialValues={initialValues} onSubmit={handleSubmit} >
            <Row>
                <FormGroup className='col'>
                    <Label for="userName">Username</Label>
                    <Input type="text" name="userName" id="userName" />
                </FormGroup>
              <Col>
                <FormGroup className='col'>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className='col'>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup className='col'>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className='col'>
                        <Label for="role">Role</Label>
                        <Input type="select" name="role" id="role">
                            <option>User</option>
                            <option>Admin</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="col-md-4">
                    <FormGroup check style={{ marginTop: '2.3rem' }}>
                        <Label check>
                        <Input
                            type="checkbox"
                            name="isActive"
                            checked={isActive}
                            onChange={handleIsActiveChange}
                            />
                        IsActive
                        </Label>
                    </FormGroup>
                    </FormGroup>
                </Col>
            </Row>
        <ModalFooter>
            <Button color="primary" type='submit' >
                Create User
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>
        </ModalFooter>
        </Form>
        </ModalBody>
    </Modal>
  );
};

NewUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewUser;
