import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../actions';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const switchChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button className="btn btn-link p-0 ml-auto" type="button">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item" key={id}>
            <button onClick={switchChannel(id)} className={cn('nav-link btn btn-block', { active: id === currentChannelId })} type="button">{name}</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
