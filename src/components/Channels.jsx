import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices/index.js';

const Channels = ({ showModal }) => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const switchChannel = (id) => () => {
    dispatch(actions.setCurrentChannelId({ id }));
  };

  return (
    <>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => (
          <li className={cn('nav-item row', { 'bg-active': channel.id === currentChannelId })} key={channel.id}>
            <div className="col-8 text-left">
              <button
                onClick={switchChannel(channel.id)}
                className="nav-link btn-block btn text-left"
                type="button"
              >
                <div className="col-10">{channel.name}</div>
              </button>
            </div>
            {channel.removable && (<button className="col-1 btn" onClick={() => showModal('renaming', channel)} type="button">&#10000;</button>)}
            {channel.removable && (<button className="col-1 btn" onClick={() => showModal('removing', channel)} type="button">&#10005;</button>)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
