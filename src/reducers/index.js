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
});

export default reducer;
