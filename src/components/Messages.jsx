import React, { useContext } from 'react';

import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import Context from '../Context';
import { actions as messagesActions } from '../slices/index.js';

import i18next from '../locales/translate';

const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'notifications.emptyMessage';
  }
  return errors;
};

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const userName = useContext(Context);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const notification = {};

  const handleSubmit = async (values, actions) => {
    const data = {
      username: userName,
      message: values.message,
      channelId: currentChannelId,
    };
    try {
      await dispatch(messagesActions.sendMessage(data));
      actions.setSubmitting(false);
      actions.setFieldValue('message', '', false);
      notification.message = '';
    } catch {
      notification.message = 'notifications.networkError';
    }
  };

  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <>
      <div id="messages" className="chat-messages overflow-auto mb-3 mt-2">
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
                  {props.errors.message && <div id="feedback" className="d-block invalid-feedback">{i18next.t(props.errors.message)}</div>}
                  {notification.message && <div className="d-block invalid-feedback">{i18next.t(notification.message)}</div>}
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
