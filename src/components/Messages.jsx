import React, { useContext } from 'react';

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
  const userName = useContext(Context);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleSubmit = async (values, actions) => {
    const data = {
      username: userName,
      message: values.message,
      channelId: currentChannelId,
    };
    await dispatch(sendMessage(data));
    actions.setSubmitting(false);
    actions.setFieldValue('message', '', false);
  };

  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <>
      <div id="messages" className="chat-messages overflow-auto mb-3">
        {filteredMessages.map(({
          username, message, id,
        }) => (
          <div key={id}>
            <span className="font-weight-bold">
              {username}
              :
              &nbsp;
            </span>
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
                    disabled={props.isSubmitting}
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
