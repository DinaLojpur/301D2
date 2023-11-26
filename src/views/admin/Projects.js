import React from 'react';
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
    Label
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import ComponentCard from '../../components/ComponentCard';


const Projects = () => {

    return (
        <Container className="mt-3">
        <Row>
            <Col sm="20">
            <Label>Feature not available in MVP</Label>
            <ComponentCard>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <Button color='success'><Icon icon='plus' color='white' /> New</Button>
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
                        <th>    </th>
                        <th>    </th>
                        <th>Project Name</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody className='bordered'>
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
