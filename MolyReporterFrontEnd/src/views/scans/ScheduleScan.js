import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input, Label, FormGroup, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleScan = ({ isOpen, toggle }) => {
  const [scheduledDate, setScheduledDate] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleDateChange = (date) => {
    setScheduledDate(date);
  };

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;
    if (itemName === 'Select All') {
      setSelectAll(checked);
      setSelectedItems(checked ? ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'] : []);
    } else {
      const updatedItems = checked
        ? [...selectedItems, itemName]
        : selectedItems.filter((item) => item !== itemName);
      setSelectedItems(updatedItems);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered backdrop="static">
      <ModalHeader>Schedule Scan (Coming in D5)</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="scheduledDate">Scheduled Date:</Label>
          <DatePicker
            id="scheduledDate"
            selected={scheduledDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
            timeCaption="Time"
          />
        </FormGroup>

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
                {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((item) => (
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
          Schedule
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ScheduleScan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ScheduleScan;


