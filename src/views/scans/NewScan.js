import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Row, Col, CardBody, Card } from 'reactstrap';
import { Formik, Field, ErrorMessage } from 'formik';

const NewScan = ({ isOpen, toggle }) => {

  const initialValues = {
    name: '', // initial value for the name field
    url: '',  // initial value for the URL field
    device: 'Default', // initial value for device
    defineSteps: false, // initial value for defineSteps (unchecked)
    depth: 0, // initial value for depth
  };
  const [selectAll, setSelectAll] = useState(false);
  const [guidanceLevels, setGuidanceLevels] = useState([]);
  const [selectedGuidances, setSelectedGuidances] = useState([]);
  //const [deviceOptions, setDeviceOptions] = useState([]);

  useEffect(() => {
    const fetchGuidanceLevels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/guidance-levels'); // replace with actual endpoint
        setGuidanceLevels(response.data); // assuming the response contains an array of guidance levels
      } catch (error) {
        console.error('Error fetching guidance levels:', error);
      }
    };
  
    fetchGuidanceLevels();
  }, []);

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedGuidances(checked ? guidanceLevels : []);
    } else {
      const updatedItems = checked
        ? [...selectedGuidances, itemName]
        : selectedGuidances.filter((item) => item !== itemName);
      setSelectedGuidances(updatedItems);
    }
  };


  // function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    // perform actions with the form data here
    try {
        const scanRequest = {
          scan_url: values.url,
          depth: values.depth,
          guidance: selectedGuidances,
          device_config: values.device,
        };
  
        // Send the scan request to your MongoDB endpoint
        await axios.post('http://localhost:3000/scan', scanRequest);
  
        toggle(); // close the modal after submission

      } catch (error) {
        console.error('Error submitting scan request:', error);
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg' centered>
      <ModalHeader>New Scan Details</ModalHeader>
      <ModalBody>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
            <Row>
            <Col md="8">
              <FormGroup>
                <Label for="name">Name</Label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  //placeholder="Enter scan name"
                  as={Input}
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup>
                <Label for="url">URL</Label>
                <Field
                  type="text"
                  name="url"
                  id="url"
                  //placeholder="Enter URL"
                  as={Input}
                />
                <ErrorMessage name="url" component="div" className="text-danger" />
              </FormGroup>
              <div className="row">
                <FormGroup className="col-md-4">
                  <Label for="device">Devices</Label>
                  <Field as={Input} type="select" name="device" id="device">
                    <option value="Default">Default</option>
                    {/* add more options here */}
                  </Field>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <FormGroup check style={{ marginTop: '2.3rem' }}>
                    <Label check>
                      <Field type="checkbox" name="defineSteps" as={Input} />
                      Define Steps
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <Label for="depth">Depth</Label>
                  <Field as={Input} type="number" name="depth" id="depth" />
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
                                checked={selectedGuidances.includes(item.level)}
                                onChange={(e) => handleCheckboxChange(e, item.level)}
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
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Scan
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

// declaring propTypes is required by Eslint - used in Scans.js
NewScan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewScan;
