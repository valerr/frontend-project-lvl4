import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    setCurrentChannelId: (state, { payload: { id } }) => id,
  },
});

const { actions } = slice;

export { actions };

export default slice.reducer;
