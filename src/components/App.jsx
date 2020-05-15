import React, { useState } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import getModal from './Modals/index.js';
import { addChannel, removeChannel } from '../actions';

const App = () => {
  const renderModal = (modal, hideModal) => {
    if (modal.type === null) return null;
    const ModalComponent = getModal(modal.type);
    return <ModalComponent hideModal={hideModal} addChannel={addChannel} removeChannel={removeChannel} channel={modal.channel} />;
  };

  const [modal, setModal] = useState({ type: null, channel: null });
  const showModal = (type, channel) => setModal({ type, channel });
  const hideModal = () => setModal({ type: null, channel: null });

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <h4>Channels</h4>
          <button onClick={() => showModal('adding')} className="btn btn-link p-0 ml-auto" type="button">+</button>
        </div>
        <Channels showModal={showModal} />
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          {renderModal(modal, hideModal, addChannel)}
        </div>
      </div>
    </div>
  );
};

export default App;
