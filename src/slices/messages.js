import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as channelsActions } from './channels';

const sendMessage = ({ username, message, channelId }) => async () => {
  const path = routes.channelMessagesPath(channelId);
  const data = { attributes: { username, message } };
  await axios.post(path, { data });
};

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    messageReceived(state, { payload: { attributes } }) {
      state.push(attributes);
    },
    messagesReceived(state, { payload }) {
      state.push(...payload);
    },
    extraReducers: {
      [channelsActions.channelRemoved](state, { payload: { id } }) {
        state.filter((item) => item.id !== id);
      },
    },
  },
});

const { actions } = slice;

export { actions, sendMessage };

export default slice.reducer;
