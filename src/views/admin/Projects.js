import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Button,
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import ComponentCard from '../../components/ComponentCard';
import NewProject from './NewProject';
import {useAxios} from "../../utils/AxiosProvider";


const Projects = () => {
  const [isNewProjectOpen, setNewProjectOpen] = useState(false);
  const [projects, SetProjects] = useState([]);
  const client = useAxios();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.get('/projects');
        SetProjects(response.data);
      } catch (error) {
        console.error('Error fetching Projects:', error);
      }
    };

    fetchProjects(); // retrieve projects from DB to display in table upon component mount
  }, []);

  const toggleNewProject = () => {
      setNewProjectOpen(!isNewProjectOpen);
  };

  const openNew = () => {
      setNewProjectOpen(true);
  };

    return (
        <Container className="mt-3">
        <Row>
            <Col sm="20">
            <ComponentCard>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <Button color='success' onClick={openNew} ><Icon icon='plus' color='white' /> New</Button>
                      <NewProject isOpen={isNewProjectOpen} toggle={toggleNewProject} />
                    </div>
                </div>
            </ComponentCard>
            </Col>
        </Row>
        <Row>
            <Col sm="20">
            <ComponentCard title="Project Details">
                <Table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody className='bordered'>
                {projects.map((project) => (
                    <tr>
                      <td>{project.name}</td>
                      <td>{project.active}</td>
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


export default Projects;
