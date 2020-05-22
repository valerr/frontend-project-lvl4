import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeChannel } from '../../actions';

const Remove = ({ channel, hideModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await dispatch(removeChannel(channel.id));
    hideModal();
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>
          Remove #
          {channel.name}
          ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <input className="btn btn-danger" type="submit" value="confirm" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Remove;
