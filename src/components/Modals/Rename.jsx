import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../actions';

const Rename = ({ channel, hideModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(renameChannel(channel.id, { name: values.body }));
    hideModal();
  };

  const ref = useRef();

  useEffect(() => {
    ref.current.select();
  }, []);

  const f = useFormik({ onSubmit: handleSubmit, initialValues: { body: channel.name } });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>
          Rename #
          {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl ref={ref} onChange={f.handleChange} data-testid="input-body" name="body" required value={f.values.body} />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Rename;
