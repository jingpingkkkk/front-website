import React, { useState } from 'react';
import './userInfo.css';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import StateButtons from '../../stake-button-popup';

const UserInfo = ({ user }) => {
  const [showStakButton, setShowStakeButton] = useState(false);
  return (
    <div className="header-right">
      <div className="balance d-none-mobile">
        <div>
          <img src="./images/ico2.png" alt="wallet" />
        </div>
        <div>
          <span className="balance-value">pts: : {user?.balance || 0}</span>
          <span className="balance-value">exp: {user?.rate || 0}</span>
        </div>
      </div>
      <div className="text-center d-none-desktop bal-point">
        pts:
        <span>{user?.balance || 0}</span> <span>| {user?.rate || 0}</span>
      </div>
      <UncontrolledDropdown>
        <DropdownToggle caret color="dark" className="username-info">
          <span className="user-icon">
            <img src="./images/userrr.png" alt="user" />
          </span>
          {user?.fullName || ''}
        </DropdownToggle>
        <DropdownMenu dark>
          <DropdownItem>Account Statement</DropdownItem>
          <DropdownItem>Current Bets</DropdownItem>
          <DropdownItem>Casino Results</DropdownItem>
          <DropdownItem onClick={() => setShowStakeButton(true)}>
            Set Button Value
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {showStakButton && (
        <StateButtons
          isOpen={showStakButton}
          toggle={() => setShowStakeButton(!showStakButton)}
        />
      )}
    </div>
  );
};

export default UserInfo;
