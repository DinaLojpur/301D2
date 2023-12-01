import React, {useEffect, useState} from 'react';
import { 
    Container,
    Row,
    Col,
    Table,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Button
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import NewUser from './NewUser';
import ComponentCard from '../../components/ComponentCard';
import {useAxios} from "../../utils/AxiosProvider";


const Users = () => {
  const client = useAxios();

  const [isNewUserOpen, setNewUserOpen] = useState(false);
  const [users, setUsers] = useState([]);

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

  const toggleNewUser = () => {
      setNewUserOpen(!isNewUserOpen);
  };

  const openNew = () => {
      setNewUserOpen(true);
  };

    return (
        <Container className="mt-3">
        <Row>
            <Col sm="20">
            <ComponentCard>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <Button color='success' onClick={openNew} ><Icon icon='plus' color='white' /> New</Button>
                      <NewUser isOpen={isNewUserOpen} toggle={toggleNewUser} />
                    </div>
                </div>
            </ComponentCard>
            </Col>
        </Row>
        <Row>
            <Col sm="20">
            <ComponentCard title="User Details">
                <Table>
                <thead>
                    <tr>
                        <th>    </th>
                        <th>    </th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>IsActive</th>
                    </tr>
                </thead>
                <tbody className='bordered'>
                {users.map((user) => (
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.admin === false ? 'User' : 'Admin'}</td>
                      <td>Yes</td>
                    </tr>
                ))}
                </tbody>
                </Table>
                <Row>
                <div className='d-flex align-items-center justify-content-center'>
                    <span className='mx-2'>
                    Showing 0 to 0 of 0 entries
                    </span>
                    <div className='m-2'>
                    <Icon icon="double-chevron-left" className='mx-2'/>
                    <Icon icon="chevron-left" className='mx-2'/>
                    <span className='mx-2'>1</span>
                    <Icon icon="chevron-right" className='mx-2'/>
                    <Icon icon="double-chevron-right" className='mx-2'/>
                    </div>
                    <UncontrolledDropdown>
                        <DropdownToggle caret color="white" className='mx-2'>
                            5
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem>5</DropdownItem>
                        <DropdownItem>10</DropdownItem>
                        <DropdownItem>25</DropdownItem>
                        <DropdownItem>50</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                </Row>
            </ComponentCard>
            </Col>
        </Row>
        </Container>
  );
};


export default Users;