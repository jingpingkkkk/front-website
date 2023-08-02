import React from 'react';
import { NavLink } from 'react-router-dom';
import topNavItems from './api/top-nav-items';
import './topNav.css';
import MenuToggleButton from './ui/MenuToggleButton';
import StickyHeader from './ui/StickyHeader';

function Topnav() {
  return (
    <StickyHeader>
      <MenuToggleButton />

      {/* Logo - Mobile View */}
      <NavLink to="/" className="ms-5 d-lg-none">
        <img src="images/logo.png" width="125" alt="brand-logo" />
      </NavLink>

      {/* Logo - Desktop View */}
      <NavLink to="/" className="d-none d-lg-block">
        <img src="images/logo.png" width="150" alt="brand-logo" />
      </NavLink>

      {/* Nav Items */}
      <div className="d-none d-lg-flex align-items-center">
        {topNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `me-4 nav-items ${isActive ? 'custom-buttton' : ''}`
            }
          >
            {item.image ? (
              <img src={item.image} alt={item.label} />
            ) : (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Auth & Theme Buttons */}
      <div className="d-flex justify-content-end align-items-center">
        <NavLink to="/login" className="custom-buttton nav-items">
          SIGN IN
        </NavLink>

        <NavLink to="/register" className="ms-2 custom-buttton nav-items">
          REGISTER
        </NavLink>

        <NavLink
          className="me-2 ms-3 setting d-none d-lg-block"
          onClick={() => console.log('toggle theme')}
        >
          <img src="images/srttings.png" alt="setting" />
        </NavLink>
      </div>
    </StickyHeader>
  );
}

export default Topnav;
