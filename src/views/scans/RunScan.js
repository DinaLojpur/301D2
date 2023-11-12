import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input, Label, FormGroup, Row, Col } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';


const RunScan = ({ isOpen, toggle }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedItems(checked ? ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'] : []);
    } else {
      const updatedItems = checked
        ? [...selectedItems, itemName]
        : selectedItems.filter((item) => item !== itemName);
      setSelectedItems(updatedItems);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
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
                {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'].map((item) => (
                  <FormGroup check key={item}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={(e) => handleCheckboxChange(e, item)}
                      />{' '}
                      {item}
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
        <Button color="primary" onClick={toggle}>
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
};

export default RunScan;



