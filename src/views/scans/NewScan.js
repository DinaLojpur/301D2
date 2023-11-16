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
} from 'reactstrap';

const NewScan = ({ isOpen, toggle }) => {
  const initialValues = {
    name: '',
    url: '',
    device: 'Default',
    defineSteps: false,
    depth: 0,
  };
  const [selectAll, setSelectAll] = useState(false);
  const [guidanceLevels, setGuidanceLevels] = useState([]);
  const [selectedGuidances, setSelectedGuidances] = useState([]);
  const [deviceOptions, setDeviceOptions] = useState([]);

  useEffect(() => {
    const fetchGuidanceLevels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/guidance-levels');
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
        const response = await axios.get('http://localhost:3000/device-configs');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Starting handleSubmit...');
    try {
      const formData = new FormData(event.target);
      const scanRequest = {
        name: formData.get('name'),
        scan_url: formData.get('url'),
        device_config: formData.get('device'),
        depth: formData.get('depth'),
        guidance: selectedGuidances,
      };

      // send the scan request to MongoDB endpoint
      const response = await axios.post('http://localhost:3000/scan', scanRequest);
      console.log(response);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error submitting scan request:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
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
                      <Input type="checkbox" name="defineSteps" />
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
          <ModalFooter>
            <Button color="primary" type="submit">
              Scan
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
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
