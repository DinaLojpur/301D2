import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input, Label, FormGroup, Row, Col, Form } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import {useAxios} from "../../utils/AxiosProvider";


const NewProject = ({ isOpen, toggle }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState([]);
  const client = useAxios();

  const initialvalues = {
    projectName: ''
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedUsers(checked ? users : []);
    } else {
      const updatedItems = checked
        ? [...selectedUsers, itemName]
        : selectedUsers.filter((item) => item !== itemName);
      setSelectedUsers(updatedItems);
    }
  };

  const handleIsActiveChange = () => {
    setIsActive(!isActive); // toggle value when checkbox changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      console.log(formData.get('projectName'));
      console.log('isActive:', isActive);
      // send new project to endpoint
      await client.post('/project');

      setIsActive(false);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error submitting Project:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered backdrop="static">
      <ModalHeader>New Project Details</ModalHeader>
      <ModalBody>
        <Form initialvalues={initialvalues} onSubmit={handleSubmit} >
            <Row>
                <FormGroup className='col-md-5'>
                    <Label for="projectName">Project Name</Label>
                    <Input type="text" name="projectName" id="projectName" />
                </FormGroup>
              <Col>
                <FormGroup className="col-md-4">
                  <FormGroup check style={{ marginTop: '2.3rem' }}>
                    <Label check>
                      <Input
                        type="checkbox" 
                        name="isActive"
                        onChange={handleIsActiveChange}
                        />
                      IsActive
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col md="6">
                <Label>Add Users:</Label>
                <Card>
                <CardBody style={{ height: '223px', overflowY: 'auto' }}>
                    <FormGroup check>
                    <Label check>
                        <Input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => handleCheckboxChange(e, 'Select All')}
                        />{' '}
                        All
                    </Label>
                    </FormGroup>
                    {users.map((user) => ( // map list of users to checklist for adding to new project
                    <FormGroup check key={user}>
                        <Label check>
                        <Input
                            type="checkbox"
                            checked={selectedUsers.includes(user)}
                            onChange={(e) => handleCheckboxChange(e, user)}
                        />{' '}
                        {user.username}
                        </Label>
                    </FormGroup>
                    ))}
                </CardBody>
                </Card>
            </Col>
            <Col md="6">
                <Label>Selected:</Label>
                <Card>
                    <CardBody style={{ height: '223px', overflowY: 'auto'}}>
                    <div className="selected-items">
                        <ul>
                            {selectedUsers.map((user) => ( // show the users that have been added to this project
                            <li key={user}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    </CardBody>
                </Card>
            </Col>
            </Row>
        <ModalFooter>
            <Button color="primary" type='submit' >
                Create Project
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

NewProject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewProject;