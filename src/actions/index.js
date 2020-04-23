import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAction('fetchChannels');

export const sendMessage = ({ username, message, channelId }) => async () => {
  const path = routes.channelMessagesPath(channelId);
  const data = { attributes: { username, message } };
  await axios.post(path, { data });
};
