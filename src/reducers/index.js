import { createReducer } from '@reduxjs/toolkit';
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
    const filtered = state.channels.filter((ch) => ch.id !== id);
    return {
      ...state,
      channels: filtered,
      currentChannelId: 1,
    }
  },
});

export default reducer;
