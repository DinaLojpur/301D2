import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ScheduleScan = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader>Schedule Scan</ModalHeader>
      <ModalBody>
        {/* add stuff here */}
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
