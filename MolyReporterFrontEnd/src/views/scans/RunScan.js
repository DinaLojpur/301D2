import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input, Label, FormGroup, Row, Col } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import {useAxios} from "../../utils/AxiosProvider";

/* eslint-disable no-underscore-dangle */

const RunScan = ({ isOpen, toggle, selectedScan }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [urls, setUrls] = useState([]);
  const client = useAxios();

  useEffect(() => {
    try {
      if (selectedScan && selectedScan.urls) {
        setUrls(selectedScan.urls);
      }
      else {
        setUrls([]);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  }, [selectedScan]);

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedItems(checked ? urls : []);
    } else {
      const updatedItems = checked
        ? [...selectedItems, itemName]
        : selectedItems.filter((item) => item !== itemName);
      setSelectedItems(updatedItems);
    }
  };

  const handleSubmit = async () => {
    try {
      const scan = {
        scanRequestId: selectedScan._id,
        urls: selectedItems,
        device: selectedScan.device,
      };
      // send the scan info to MongoDB endpoint
      await client.post('/run-scan', scan);
      toggle(); // close the modal after submission
    } catch (error) {
      console.error('Error running scan:', error);
    }
  };


  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered backdrop="static">
      <ModalHeader>Run Scan</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="6">
            <Label>Select URLs:</Label>
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
                {urls.map((url) => (
                  <FormGroup check key={url}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedItems.includes(url)}
                        onChange={(e) => handleCheckboxChange(e, url)}
                      />{' '}
                      {url}
                    </Label>
                  </FormGroup>
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Label>Selected:</Label>
            <Card>
                <CardBody style={{ height: '223px', overflowY: 'auto'}}>
                <div className="selected-items">
                    <ul>
                        {selectedItems.map((item) => (
                        <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
            Start Scan
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

RunScan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedScan: PropTypes.object.isRequired,
};

export default RunScan;



