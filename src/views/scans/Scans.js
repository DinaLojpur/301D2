import React, { useState } from 'react';
import { 
    Form,
    Input,
    Container,
    Row,
    Col,
    Table,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Button,
    ButtonToolbar
    // Pagination,
    // PaginationItem,
    // PaginationLink
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import NewScan from './NewScan';
import ScheduleScan from './ScheduleScan';
import ComponentCard from '../../components/ComponentCard';


const Scans = () => {
    // data needed when backend is implemented
    // const projects = [];
    // const scans = [];
    // const selectedProject = null;
    // const selectedScans = [];

    // const items = [];
    // const onProjectChange = () => {

    // };
    const [isNewScanOpen, setNewScanOpen] = useState(false);
    const [isScheduleScanOpen, setScheduleScanOpen] = useState(false);

    const toggleNewScan = () => {
        setNewScanOpen(!isNewScanOpen);
    };

    const openNew = () => {
        setNewScanOpen(true);
    };

    const toggleScheduleScan = () => {
        setScheduleScanOpen(!isScheduleScanOpen);
    };

    const openSchedule = () => {
        setScheduleScanOpen(true);
    };

    const deleteSelectedScans = () => {

    };

    // const exportExcel = () => {

    // };

    const scanDetails = [
        {
            id: 1,
            scanName: 'Scan 1',
            url: 'https://0barriers.org/scan1',
            depth: 1,
            guidance: 'WCAG2AA',
            lastScanOn: '2023-01-15 @ 6:11 AM',
            nextScheduledOn: '2023-02-01 @ 12:00 AM',
        },
        {
            id: 2,
            scanName: 'Scan 2',
            url: 'https://0barriers.org/scan2',
            depth: 2,
            guidance: 'WCAG2A',
            lastScanOn: '2023-01-20 @ 8:43 PM',
            nextScheduledOn: '2023-02-10 @ 3:00 AM',
        }
    ];

    return (
        <Container className="mt-3">
        <Row>
            <Col sm="20">
            <ComponentCard>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <h4 style={{ marginRight: '10px' }}>Projects</h4>
                        <UncontrolledDropdown>
                            <DropdownToggle caret color="white" style={{ width:'250px' }}>
                                Select a Project
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem>Project 1</DropdownItem>
                            </DropdownMenu>
                            {/* options={projects},
                            value={selectedProject},
                            onChange={onProjectChange},
                            filter,
                            filterBy="name",
                            placeholder="Select a Project",
                            optionLabel="name" */}    
                        </UncontrolledDropdown>
                    </div>
                    <div>
                    <ButtonToolbar>
                        <Form className='m-1'>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <Icon icon="search" />
                                </span>
                            </div>
                            <Input
                            // className="form-control "
                            // id="searchEmail"
                            // name="searchEmail"
                            // type="text"
                            // value={searchTerm}
                            placeholder="Search..."
                            />
                        </div>
                        </Form>
                        <Button color='info' onClick={openNew} className='text-center m-1'>
                            <Icon icon='plus' color='white' /> New
                        </Button>
                        <NewScan isOpen={isNewScanOpen} toggle={toggleNewScan} />
                        <UncontrolledDropdown className='text-center m-1'>
                            <DropdownToggle caret color='info'>
                            Select Action
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem>Run Scan</DropdownItem>
                            <DropdownItem onClick={openSchedule}>Schedule Scan</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <ScheduleScan isOpen={isScheduleScanOpen} toggle={toggleScheduleScan} />
                        <Button color='info' onClick={deleteSelectedScans} className='text-center m-1'>
                            <Icon icon='refresh' color='white' /> Refresh
                        </Button>
                        <Button color='info' className='text-center m-1'>
                            <Icon icon='export' color='white' /> Export
                        </Button>
                    </ButtonToolbar>
                    </div>
                </div>
            </ComponentCard>
            </Col>
        </Row>
        <Row>
            <Col sm="20">
            <ComponentCard title="Scan Details">
                <Table>
                <thead>
                    <tr>
                        <th>    </th>
                        <th>    </th>
                        <th>Scan Name</th>
                        <th>URL</th>
                        <th>Depth</th>
                        <th>Guidance</th>
                        <th>Last Scan On</th>
                        <th>Next Scheduled On</th>
                    </tr>
                </thead>
                <tbody className='bordered'>
                    {scanDetails.map((scan) => (
                        <tr key={scan.id}>
                            <td><Icon icon="chevron-right" /></td>
                            <td><Input type="checkbox" id="exampleCustomCheckbox" /></td>
                            <td>{scan.scanName}</td>
                            <td>{scan.url}</td>
                            <td>{scan.depth}</td>
                            <td>{scan.guidance}</td>
                            <td>{scan.lastScanOn}</td>
                            <td>{scan.nextScheduledOn}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                <Row>
                <div className='d-flex align-items-center justify-content-center'>
                    <span className='mx-2'>
                    Showing 1 to 2 of 2 entries
                    </span>
                    <div className='m-2'>
                    <Icon icon="double-chevron-left" className='mx-2'/>
                    <Icon icon="chevron-left" className='mx-2'/>
                    <span className='mx-2'>1</span>
                    <Icon icon="chevron-right" className='mx-2'/>
                    <Icon icon="double-chevron-right" className='mx-2'/>
                    </div>
                    {/* <Pagination aria-label="Page navigation" className='m-1'>
                        <PaginationItem disabled>
                            <PaginationLink previous href="#" />
                        </PaginationItem>
                        <PaginationItem active>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">4</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">5</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next href="#" />
                        </PaginationItem>
                    </Pagination> */}
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

export default Scans;
