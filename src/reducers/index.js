import { createReducer } from '@reduxjs/toolkit';
import actions from '../actions';

const reducer = createReducer({}, {
  [actions.fetchData]: (state, action) => {
    const { channels, messages } = action.payload;
    return {
      ...state,
      channels,
      messages,
    };
  },
});

export default reducer;
