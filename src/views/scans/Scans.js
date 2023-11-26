import React, { useState, useEffect } from 'react';
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
    ButtonToolbar,
    UncontrolledCollapse
    // Pagination,
    // PaginationItem,
    // PaginationLink
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import axios from 'axios';
import NewScan from './NewScan';
import RunScan from './RunScan';
import ScheduleScan from './ScheduleScan';
import ComponentCard from '../../components/ComponentCard';



const Scans = () => {
    const [isNewScanOpen, setNewScanOpen] = useState(false);
    const [isScheduleScanOpen, setScheduleScanOpen] = useState(false);
    const [isRunScanOpen, setRunScanOpen] = useState(false);
    //const [openResultsForScan, setOpenResultsForScan] = useState(null);
    const [scanDetails, setScanDetails] = useState([]);
    const [scanResults, setScanResults] = useState([]);

    const fetchScanDetails = async () => {
        try {
          const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/scan_request'); // replace with actual endpoint
          setScanDetails(response.data.reverse());
        } catch (error) {
          console.error('Error fetching Scan Details:', error);
        }
    };

    const fetchScanResults = async (request) => {
        try {
            const response = await axios.get(`https://deliverable3.marcomarchesano.com:3000/scan/?scanRequestId=${request}`);
            setScanResults(response.data);
        } catch (error) {
          console.error('Error fetching Scan Results:', error);
        }
    };

    useEffect(() => {
        fetchScanDetails(); // get scan details to populate the rows
    }, []);

    const handleRefresh = () => {
        fetchScanDetails();
    };

    const toggleNewScan = () => {
        setNewScanOpen(!isNewScanOpen);
    };

    const openNew = () => {
        setNewScanOpen(true);
    };

    const toggleRunScan = () => {
        setRunScanOpen(!isRunScanOpen);
    };

    const openRun = () => {
        setRunScanOpen(true);
    };

    const toggleScheduleScan = () => {
        setScheduleScanOpen(!isScheduleScanOpen);
    };

    const openSchedule = () => {
        setScheduleScanOpen(true);
    };

    const openResultsForScan = (scanId) => {
        fetchScanResults(scanId); // get results for the scan that the results drop down has been opened for
    };

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
                            <DropdownItem>Not Available in MVP</DropdownItem>
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
                            <DropdownItem onClick={openRun}>Run Scan</DropdownItem>
                            <DropdownItem onClick={openSchedule}>Schedule Scan</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <RunScan isOpen={isRunScanOpen} toggle={toggleRunScan} />
                        <ScheduleScan isOpen={isScheduleScanOpen} toggle={toggleScheduleScan} />
                        <Button color='info' onClick={handleRefresh} className='text-center m-1'>
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
                <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>    </th>
                        <th>    </th>
                        <th>Scan Name</th>
                        <th>URL</th>
                        <th>Depth</th>
                        <th>Guidances</th>
                        <th>Last Scan On</th>
                        <th>Next Scheduled On</th>
                    </tr>
                </thead>
                <tbody className='bordered'>
                {scanDetails.map((scan, index) => (
                  <React.Fragment key={scan.id}>
                    <tr >
                      <td>
                        {/* eslint-disable no-underscore-dangle */}
                        <Button color="link" id={`chevron${index}`} onClick={() => openResultsForScan(scan._id)}>
                        {/* eslint-enable no-underscore-dangle */}
                          <Icon icon="chevron-right" />
                        </Button>
                      </td>
                      <td><Input type="checkbox" /></td>
                      <td>{scan.name}</td>
                      <td>{scan.url}</td>
                      <td>{scan.depth}</td>
                      <td>{scan.guidance}</td>
                      <td>{scan.date_created}</td>
                      <td>-</td>
                    </tr>
                    <UncontrolledCollapse toggler={`#chevron${index}`}>
                        <tr>
                            <td >
                            <Table style={{ position: 'absolute', width: '97%', backgroundColor: '#fff', zIndex: 1 }} >
                                <thead>
                                    <tr>
                                    <th>Page</th>
                                    <th>Timestamp</th>
                                    <th>Score</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {scanResults.map((result) => (
                                  <tr key={result.id}>
                                    <td>{result.url}</td>
                                    <td>{result.timestamp}</td>
                                    <td>{result.score}</td>
                                    <td>{scan.status}</td>
                                  </tr>
                                ))}
                                </tbody>
                            </Table>
                            </td>
                            </tr>
                    </UncontrolledCollapse>
                  </React.Fragment>
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
