/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ExchangeMenuItem from './ExchangeMenuItem';
import menuItems from './exchange-menu-items';

function ExchangeSideMenu() {
  const [activeMenuId, setActiveMenuId] = useState(menuItems[0].id);
  const [activeSubMenuId, setActiveSubMenuId] = useState(menuItems[0].id);

  const handleOptionSelect = (id) => {
    setActiveMenuId(id);
    setActiveSubMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <nav id="sidebar">
      <ul className="list-unstyled components">
        <li className="all-sports">
          <a href="#">
            <span className="image-outer">
              <img src="images/all-Sports.png" />
            </span>
            All Sports
          </a>
          <span className="calender-img">
            <img src="images/calender.png" />
          </span>
        </li>

        {menuItems.map((item) => (
          <ExchangeMenuItem
            key={item.id}
            item={item}
            activeSubMenu={item.id === activeSubMenuId}
            activeMenu={item.id === activeMenuId}
            onClick={handleOptionSelect}
          />
        ))}
      </ul>
    </nav>
  );
}

export default ExchangeSideMenu;
