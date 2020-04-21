import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  console.log(channels);
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <li className="nav-item" key={id}>
          <button className="nav-link btn btn-block active" type="button">{name}</button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
