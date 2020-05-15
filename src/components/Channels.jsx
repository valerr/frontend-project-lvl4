import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../actions';

const Channels = ({showModal}) => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const switchChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  return (
    <>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => (
          <li className="nav-item row" key={channel.id}>
            <button
              onClick={switchChannel(channel.id)}
              className={cn('nav-link btn btn-block text-left',
                { active: channel.id === currentChannelId })}
              type="button"
            >
              <div className="d-inline-block col-8">{channel.name}</div>
              &nbsp;
              &nbsp;
              &nbsp;
              <span onClick={() => showModal('removing', channel)} className="badge badge-light d-inline col">&#10005;</span>
              &nbsp;
              <span className="badge badge-light d-inline col">&#10000;</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
