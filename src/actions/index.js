import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAction('fetchData');

export const messageReceived = createAction('messageReceived');

export const channelAdded = createAction('channelAdded');

export const setCurrentChannelId = createAction('setCurrentChannelId');

export const sendMessage = ({ username, message, channelId }) => async () => {
  const path = routes.channelMessagesPath(channelId);
  const data = { attributes: { username, message } };
  await axios.post(path, { data });
};

export const addChannel = ({ id, name, removable }) => async () => {
  const path = routes.channelsPath();
  const data = { attributes: { id, name, removable } };
  await axios.post(path, { data });
};
