import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import actions from './actions';

import App from './components/App';

const state = {
  channels: [],
  messages: [],
};

const init = (gon) => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    state,
  });

  store.dispatch(actions.fetchChannels(gon));
  // store.dispatch(fetchMessages(gon));

  ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
