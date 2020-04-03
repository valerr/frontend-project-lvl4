import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ channels }) => (
  <ul>
    {channels.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

export default (channels) => {
  ReactDOM.render(
    <App channels={channels} />,
    document.getElementById('chat'),
  );
};
