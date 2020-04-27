import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <li className="nav-item" key={id}>
          <button className={cn('nav-link btn btn-block', { active: id === currentChannelId })} type="button">{name}</button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
