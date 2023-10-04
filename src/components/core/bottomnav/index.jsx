import React from 'react';
import './bottomnav.css';
import { NavLink, useNavigate } from 'react-router-dom';
import bottomNavItems from './api/bottom-nav-items';

const Bottomnav = () => {
  const navigate = useNavigate();
  const onchangeMenu = (e, path) => {
    if (path !== '/sports') {
      e?.preventDefault();
    } else {
      navigate(path);
    }
  };
  return (
    <div className="bottom-tabs">
      <ul>
        {bottomNavItems.map((item) => (
          <li className="truncate all-sports" key={item.label}>
            <NavLink
              to={item.path}
              onClick={(e) => {
                onchangeMenu(e, item.path);
              }}
            >
              <img src="./images/cricket.svg" alt={item?.label} />
              <div className="title-name">{item.label}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bottomnav;
