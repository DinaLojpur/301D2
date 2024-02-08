import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useAxios } from '../../utils/AxiosProvider';

/* eslint-disable no-underscore-dangle */

const DeleteScan = ({ isOpen, toggle, selectedScan }) => {
    const client = useAxios();

    const handleDelete = async () => {
        try {
            if (selectedScan) {
                const scanRequestId = selectedScan._id;
                await client.delete(`/scans/delete`, scanRequestId);
            }
            toggle();
        } catch (error) {
            console.error('Error deleting scan:', error);
        }
    };
  console.log(selectedScan);
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered backdrop="static">
      <ModalHeader>Delete Scan</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this scan? ({selectedScan ? selectedScan.name : 'No Scan Selected'})
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteScan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedScan: PropTypes.object.isRequired,
};

export default DeleteScan;
