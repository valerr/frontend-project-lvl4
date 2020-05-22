import { createReducer } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.fetchData]: (state, action) => {
    const { channels, messages, currentChannelId } = action.payload;
    return {
      ...state,
      channels,
      messages,
      currentChannelId,
    };
  },
  [actions.messageReceived]: (state, { payload: { attributes } }) => {
    state.messages.push(attributes);
  },
  [actions.setCurrentChannelId]: (state, { payload: { id } }) => (
    {
      ...state,
      currentChannelId: id,
    }
  ),
  [actions.channelAdded]: (state, { payload: { attributes } }) => {
    state.channels.push(attributes);
  },
  [actions.channelRemoved]: (state, { payload: { id } }) => {
    remove(state.channels, (ch) => ch.id === id);
  },
  [actions.channelRenamed]: (state, { payload: { id, attributes: { name } } }) => {
    remove(state.channels, (ch) => ch.id === id);
    state.channels.push({ id, name, removable: true });
  },
});

export default reducer;
