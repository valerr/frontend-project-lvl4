import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAction('fetchData');

export const messageReceived = createAction('messageReceived');

export const channelAdded = createAction('channelAdded');

export const channelRemoved = createAction('channelRemoved');

export const channelRenamed = createAction('channelRenamed');

export const setCurrentChannelId = createAction('setCurrentChannelId');

export const sendMessage = ({ username, message, channelId }) => async () => {
  const path = routes.channelMessagesPath(channelId);
  const data = { attributes: { username, message } };
  await axios.post(path, { data });
};

export const addChannel = ({ name }) => async () => {
  const path = routes.channelsPath();
  const data = { attributes: { name } };
  await axios.post(path, { data });
};

export const removeChannel = (id) => async () => {
  const path = routes.channelPath(id);
  await axios.delete(path);
};

export const renameChannel = (id, { name }) => async () => {
  const path = routes.channelPath(id);
  const data = { attributes: { name } };
  await axios.patch(path, { data });
};
