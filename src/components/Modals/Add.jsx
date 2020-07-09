import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';

const Add = ({ hideModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const channel = { name: values.body };
    await dispatch(actions.addChannel(channel));
    hideModal();
  };

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  const f = useFormik({ onSubmit: handleSubmit, initialValues: { body: '' } });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Add new channel:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl ref={ref} onChange={f.handleChange} value={f.values.body} required name="body" />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Add;
