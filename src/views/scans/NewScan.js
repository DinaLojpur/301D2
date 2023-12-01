import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardBody,
  Card,
  Table,
  CardHeader,
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';
import StepDetails from './StepDetails';

const NewScan = ({ isOpen, toggle }) => {
  const initialValues = {
    name: '',
    url: '',
    device: 'Default',
    defineSteps: false,
    depth: 0,
  };
  const [isStepDetailsOpen, setStepDetailsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [guidanceLevels, setGuidanceLevels] = useState([]);
  const [selectedGuidances, setSelectedGuidances] = useState([]);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [showStepsTable, setShowStepsTable] = useState(false);
  const [isCardMinimized, setIsCardMinimized] = useState(false);
  const [createdSteps, setCreatedSteps] = useState([]);

  useEffect(() => {
    const fetchGuidanceLevels = async () => {
      try {
        const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/guidance-levels');
        setGuidanceLevels(response.data.guidance_levels);
      } catch (error) {
        console.error('Error fetching guidance levels:', error);
      }
    };

    fetchGuidanceLevels();
  }, []);

  useEffect(() => {
    const fetchDeviceOptions = async () => {
      try {
        const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/device-configs');
        setDeviceOptions(response.data.name);
      } catch (error) {
        console.error('Error fetching guidance levels:', error);
      }
    };

    fetchDeviceOptions();
  }, []);

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedGuidances(checked ? guidanceLevels.map((item) => item) : []);
    } else {
      const updatedItems = checked
        ? [...selectedGuidances, itemName]
        : selectedGuidances.filter((item) => item !== itemName);
      setSelectedGuidances(updatedItems);
    }
  };

  const toggleStepDetails = () => {
    setStepDetailsOpen(!isStepDetailsOpen);
  };

  const openStep = () => {
    setStepDetailsOpen(true);
  };

  const handleDefineStepsChange = (event) => {
    setShowStepsTable(event.target.checked);
  };

  const handleToggleCard = () => {
    setIsCardMinimized(!isCardMinimized);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const scanRequest = {
        name: formData.get('name'),
        scan_url: formData.get('url'),
        device_config: formData.get('device'),
        depth: formData.get('depth'),
        guidance: selectedGuidances,
        steps: createdSteps,
      };

      // send the scan request to MongoDB endpoint
      await axios.post('https://deliverable3.marcomarchesano.com:3000/scan', scanRequest);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error submitting scan request:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" centered backdrop="static">
      <ModalHeader>New Scan Details</ModalHeader>
      <ModalBody>
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <Row>
            <Col md="8">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" />
              </FormGroup>
              <FormGroup>
                <Label for="url">URL</Label>
                <Input type="text" name="url" id="url" />
              </FormGroup>
              <div className="row">
                <FormGroup className="col-md-4">
                  <Label for="device">Devices</Label>
                  <Input type="select" name="device" id="device">
                    {deviceOptions.map((device) => (
                      <option key={device} value={device}>
                        {device}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <FormGroup check style={{ marginTop: '2.3rem' }}>
                    <Label check>
                      <Input 
                        type="checkbox" 
                        name="defineSteps" 
                        onChange={handleDefineStepsChange}/>
                      Define Steps
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <Label for="depth">Depth</Label>
                  <Input type="number" name="depth" id="depth" min="0" />
                </FormGroup>
              </div>
            </Col>
            <Col md="4">
              <Label>Guidances:</Label>
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
                  {guidanceLevels.map((item) => (
                    <FormGroup check key={item}>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={selectedGuidances.includes(item)}
                          onChange={(e) => handleCheckboxChange(e, item)}
                        />{' '}
                        {item}
                      </Label>
                    </FormGroup>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Add Steps toggled when Define Steps checkbox is ticked */}
          {showStepsTable && (
            <Card className='mb-3'>
                {/* Title */}
                <CardHeader className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontWeight: 'bold' }}>Add Steps</span>
                  <Button color="link" onClick={handleToggleCard}>
                    {isCardMinimized ? 'Expand' : 'Minimize'}
                  </Button>
                </div>
                </CardHeader>
                <div className={isCardMinimized ? 'd-none' : ''}> {/* Minimize Toggle */}
                  <CardBody className='p-3'>
                  {/* Buttons */}
                  <div className="d-flex justify-content-end">
                    <Button color="success" onClick={openStep} className="mr-2 m-1">
                      <Icon icon='plus' color='white' /> New
                    </Button>
                    <StepDetails isOpen={isStepDetailsOpen} toggle={toggleStepDetails} setCreatedSteps={setCreatedSteps} />
                    <Button color="primary" className='m-1'>
                      <Icon icon='export' color='white' /> Export
                    </Button>
                  </div>
                  {/* Table */}
                  <Table bordered hover size="sm" className='m-2'>
                    <thead>
                      <tr>
                        <th>Element Type</th>
                        <th>FindBy</th>
                        <th>FindValue</th>
                        <th>Action</th>
                        <th>WaitTime</th>
                        <th>IsActive</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {createdSteps.map((step) => (
                        <tr key={step.url}>
                          <td>{step.elemType}</td>
                          <td>{step.findBy}</td>
                          <td>{step.findValue}</td>
                          <td>{step.stepAction}</td>
                          <td>{step.waitTime}</td>
                          <td>{step.isActive}</td>
                          <td>{step.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                </div>
            </Card>
          )}
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
            <Icon icon='cross' color='white' /> Cancel
            </Button>
            <Button color="primary" type="submit">
            <Icon icon='tick' color='white' /> Save
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

NewScan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewScan;
