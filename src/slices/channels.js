import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { remove } from 'lodash';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    fetchChannels(state, { payload }) {
      state.push(...payload);
    },
    channelAdded(state, { payload: { attributes } }) {
      state.push(attributes);
    },
    channelRemoved(state, { payload: { id } }) {
      remove(state, ((ch) => ch.id === id));
      state.filter((channel) => channel.id !== id);
    },
    channelRenamed(state, { payload: { id, attributes: { name } } }) {
      const channelToRename = state.find((ch) => ch.id === id);
      channelToRename.name = name;
    },
  },
});

const addChannel = ({ name }) => async () => {
  const path = routes.channelsPath();
  const data = { attributes: { name } };
  await axios.post(path, { data });
};

const removeChannel = (id) => async () => {
  const path = routes.channelPath(id);
  await axios.delete(path);
};

const renameChannel = (id, { name }) => async () => {
  const path = routes.channelPath(id);
  const data = { attributes: { name } };
  await axios.patch(path, { data });
};

const { actions } = slice;

export {
  actions, addChannel, removeChannel, renameChannel,
};

export default slice.reducer;
