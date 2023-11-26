import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Icon } from '@blueprintjs/core';

const StepDetails = ({ isOpen, toggle }) => {
  const initialValues = {
    url: '',
    elemType: '',
    findBy: '',
    depth: 0,
    elemInput: 'Default',
    findValue: '',
    stepAction: 'Default',
    waitTime: 0,
    runScan: false,
    isActive: false,
    notes: '',
  };

  /* 
  useEffect(() => {
    const fetchElementTypes = async () => {
      try {
        const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/guidance-levels');
        setElementTypes(response.data.element_types);
      } catch (error) {
        console.error('Error fetching element types:', error);
      }
    };

    fetchElementTypes();
  }, []);

  useEffect(() => {
    const fetchFindBySelectorTypes = async () => {
      try {
        const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/guidance-levels');
        setFindBySelectorTypes(response.data.selector_types);
      } catch (error) {
        console.error('Error fetching selector types:', error);
      }
    };

    fetchFindBySelectorTypes();
  }, []);

  useEffect(() => {
    const fetchStepActionTypes = async () => {
      try {
        const response = await axios.get('https://deliverable3.marcomarchesano.com:3000/guidance-levels');
        setStepActionTypes(response.data.stepaction_types);
      } catch (error) {
        console.error('Error fetching step action types:', error);
      }
    };

    fetchStepActionTypes();
  }, []);

  TODO: change this after seeking clarification on 
  how to handle Run scan and Is Active checkmarks
  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    const updatedItems = checked
      ? [...selectedGuidances, itemName]
      : selectedGuidances.filter((item) => item !== itemName);
    setSelectedGuidances(updatedItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Starting handleSubmit...');
    try {
      const formData = new FormData(event.target);
      const stepRequest = {
        name: formData.get('name'),
        scan_url: formData.get('url'),
        device_config: formData.get('device'),
        depth: formData.get('depth'),
        guidance: selectedGuidances,

        url: formData.get('url'),
        elemType: formData.get('elemType'),
        findBy: formData.get('findBy'),
        depth: formData.get('depth'),
        elemInput: formData.get('elemInput'),
        findValue: formData.get('findValue'),
        stepAction: formData.get('stepAction'),
        waitTime: formData.get('waitTime'),
        runScan: formData.get('runScan'),
        isActive: formData.get('isActive'),
        notes: formData.get('notes'),
      };

      // send the scan request to MongoDB endpoint
      await axios.post('https://deliverable3.marcomarchesano.com:3000/step', stepRequest);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error submitting step request:', error);
    }
  };
  */

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" centered backdrop="static">
      <ModalHeader>Step Details</ModalHeader>
      <ModalBody>
        <Form initialValues={initialValues}>
          <Row>
          <Col md="12">
            <FormGroup>
              <Label for="url">URL</Label>
              <Input type="url" name="url" id="url" />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col md="4">
            <FormGroup>
            <Label for="elemType">Element Type</Label>
            <Input type="select" name="elemType" id="elemType">
              <option>Select Element</option>
              <option>Input</option>
              <option>Select</option>
              <option>Button</option>
              <option>Span</option>
              <option>Div</option>
              <option>Form</option>
              {/*
              {elemTypeOptions.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
              */}
            </Input>
            </FormGroup>
          </Col>
          <Col md="3">
          <FormGroup>
            <Label for="findBy">Find Element By</Label>
            <Input type="select" name="findBy" id="findBy">
              <option>Select Value</option>
              <option>Id</option>
              <option>Name</option>
              <option>XPath</option>
              <option>ClassName</option>
              <option>TagName</option>
              <option>CssSelector</option>
              {/*
              {findByOptions.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
              */}
            </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="col-md-4">
              <Label for="depth">Depth</Label>
              <Input type="number" name="depth" id="depth" min="0" />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col md="12">
            <FormGroup>
              <Label for="elemInput">Element Input</Label>
              <Input type="text" name="elemInput" id="elemInput" />
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col md="4">
            <FormGroup>
              <Label for="findValue">Find Value</Label>
              <Input type="number" name="findValue" id="findValue" />
            </FormGroup>
          </Col>
          <Col md="2">
          <FormGroup>
            <Label for="stepAction">Step Action</Label>
            <Input type="select" name="stepAction" id="stepAction">
              <option>Select Value</option>
              <option>InputText</option>
              <option>Click</option>
              <option>SelectValue</option>
              <option>Navigate</option>
              {/*
              {stepActionOptions.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
              */}
            </Input>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <Label for="waitTime">Wait Time</Label>
              <Input type="number" name="waitTime" id="waitTime" min="0" />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="row-md-4">
              <FormGroup check inline style={{ marginTop: '2.3rem' }}>
                <Label check>
                  <Input 
                    type="checkbox" 
                    name="runScan" />
                  Run Scan
                </Label>
              </FormGroup>
              <FormGroup check inline style={{ marginTop: '2.3rem' }}>
                <Label check>
                  <Input 
                    type="checkbox" 
                    name="isActive" />
                  Is Active
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col md="12">
            <FormGroup>
              <Label>Notes</Label>
              <Input type="textarea" style={{ height: '120px'}} />
            </FormGroup>
          </Col>
          </Row>
        </Form>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
          <Icon icon='cross' color='white' /> Cancel
          </Button>
          <Button color="primary" type="submit">
          <Icon icon='tick' color='white' /> Save
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

StepDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default StepDetails;
