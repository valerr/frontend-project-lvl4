import React from 'react';
import Channels from './Channels';

const App = () => (
  <div className="row h-100 pb-3">
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button className="btn btn-link p-0 ml-auto" type="button">+</button>
      </div>
      <Channels />
    </div>
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages" className="chat-messages overflow-auto mb-3">
          messages
        </div>
        input
      </div>
    </div>
  </div>
);

export default App;
