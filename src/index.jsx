import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import reducer from './reducers';
import { fetchData, messageReceived } from './actions';
import Context from './Context';

import App from './components/App';

const state = {
  channels: [],
  messages: [],
  currentChannelId: 1,
};

const createUser = () => {
  const name = faker.name.findName();
  Cookies.set('name', name);
};

const init = (gon) => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    state,
  });

  store.dispatch(fetchData(gon));
  const socket = io();

  socket.on('newMessage', ({ data }) => {
    store.dispatch(messageReceived(data));
  });

  createUser();

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
