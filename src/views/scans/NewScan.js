import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Field, ErrorMessage } from 'formik';

const NewScan = ({ isOpen, toggle }) => {

  const initialValues = {
    name: '', // initial value for the name field
    url: '',  // initial value for the URL field
    device: 'Default', // initial value for device
    defineSteps: false, // initial value for defineSteps (unchecked)
    depth: 0, // initial value for depth
  };

  // function to handle form submission
  const handleSubmit = (values) => {
    // perform actions with the form data here, e.g., sending it to the server.
    console.log('Form data submitted:', values);
    toggle(); // close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg' centered>
      <ModalHeader>New Scan Details</ModalHeader>
      <ModalBody>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
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
              <ModalFooter>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Save
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
