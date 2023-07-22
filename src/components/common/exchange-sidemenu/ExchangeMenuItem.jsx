/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './styles.css';

function ExchangeMenuItem({ item, onClick = () => {}, activeMenu = false, activeSubMenu = false }) {
  const { id, label, image, subMenu = [] } = item;

  return (
    <li className={activeMenu ? 'active' : ''}>
      <a href="#" className="dropdown-toggle" onClick={() => onClick(id)}>
        <span className="image-outer">
          <img src={image} alt={label.toLowerCase().split(' ').join('_')} />
        </span>
        {label}
      </a>

      {subMenu?.length ? (
        <div className={`sub-menu ${activeSubMenu ? 'open' : ''}`}>
          <ul className="list-unstyled">
            {subMenu.map((subItem) => (
              <li key={subItem.id}>
                <a href="#">{subItem.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export default ExchangeMenuItem;
