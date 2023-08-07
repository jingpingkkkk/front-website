import React, { useState } from 'react';
import ExchangeSideMenu from '../../../common/exchange-sidemenu';

function MenuToggleButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="mobile-toggler" style={{ display: 'none' }}>
        <button
          type="button"
          className="navbar-toggle collapsed"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="visually-hidden-focusable">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>

      <div className={menuOpen ? 'mobile-sidebar-active' : 'd-none'}>
        <ExchangeSideMenu />
      </div>
    </>
  );
}

export default MenuToggleButton;
