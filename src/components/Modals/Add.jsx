import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const Add = ({ hideModal, addChannel }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const channel = { id: _.uniqueId(), name: values.body, removable: true };
    await dispatch(addChannel(channel));
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
