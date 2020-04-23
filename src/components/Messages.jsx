import React from 'react';
import { useContext } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import Context from '../Context';
import { sendMessage } from '../actions';

const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Message should not be empty';
  }
  return errors;
};

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const username = useContext(Context);

  const handleSubmit = async (values, actions) => {
    const data = {
      username,
      message: values.message,
    };
    await dispatch(sendMessage(data));
    actions.setSubmitting(false);
  };

  return (
    <>
      <div id="messages" className="chat-messages overflow-auto mb-3">
        {messages.map(({
          username, message, id,
        }) => (
          {/* TODO filter by channel */},
            <div key={id}>
              <span className="font-weight-bold">{username}: </span>
              {message}
            </div>
        ))}
      </div>
      <Formik initialValues={{ message: '' }} validate={validate} onSubmit={handleSubmit}>
        {(props) => (
          <div className="mt-auto">
            <form onSubmit={props.handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.message}
                    name="message"
                    id="message"
                  />
                  {props.errors.message && <div id="feedback" className="d-block invalid-feedback">{props.errors.message}</div>}
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Messages;
