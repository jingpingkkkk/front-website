import React from 'react';

function MenuToggleButton() {
  const handleMobileMenuToggle = () => {
    document.body.classList.toggle('menu-open');
  };

  return (
    <div className="mobile-toggler" style={{ display: 'none' }}>
      <button
        type="button"
        className="navbar-toggle collapsed"
        onClick={() => handleMobileMenuToggle()}
      >
        <span className="visually-hidden-focusable">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    </div>
  );
}

export default MenuToggleButton;
