import React, { useState } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import getModal from './Modals/index.js';

const App = () => {
  const renderModal = (modal, hideModal) => {
    if (modal.type === null) return null;
    const ModalComponent = getModal(modal.type);
    return (
      <ModalComponent hideModal={hideModal} channel={modal.channel} />
    );
  };

  const [modal, setModal] = useState({ type: null, channel: null });
  const showModal = (type, channel) => setModal({ type, channel });
  const hideModal = () => setModal({ type: null, channel: null });

  return (
    <div className="row h-100">
      <div className="col-3 border-right">
        <div className="d-flex mb-2 mt-2">
          <h5>Channels</h5>
          <button onClick={() => showModal('adding')} className="btn btn-link p-0 ml-auto" type="button">+</button>
        </div>
        <Channels showModal={showModal} />
      </div>
      <div className="col h-100 bg-white">
        <div className="d-flex flex-column h-100">
          <Messages />
          {renderModal(modal, hideModal)}
        </div>
      </div>
    </div>
  );
};

export default App;
