import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import reducer, { actions } from './slices/index.js';
import Context from './Context';

import App from './components/App';

const createUser = () => {
  const name = faker.name.findName();
  Cookies.set('name', name);
};

const init = (gon) => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  if (!Cookies.get('name')) {
    createUser();
  }

  store.dispatch(actions.fetchChannels(gon.channels));
  store.dispatch(actions.messagesReceived(gon.messages));
  const socket = io();

  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.messageReceived(data));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.channelAdded(data));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.channelRemoved(data));
  });

  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.channelRenamed(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <Context.Provider value={Cookies.get('name')}>
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
