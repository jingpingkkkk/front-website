import React from 'react';
import './bottomnav.css';

const Bottomnav = () => {
  return (
    <div className="bottom-tabs">
      <ul>
        <li className="truncate all-sports">
          <a href="/">
            <img src="./images/cricket.svg" alt="sports" />
          </a>
          <div className="title-name">Exchange</div>
        </li>
        <li className="truncate all-sports">
          <a href="/">
            <img src="./images/cricket.svg" alt="sports" />
          </a>
          <div className="title-name">Casino</div>
        </li>
        <li className="truncate all-sports">
          <a href="/">
            <img src="./images/cricket.svg" alt="sports" />
          </a>
          <div className="title-name">Slot</div>
        </li>
        <li className="truncate all-sports">
          <a href="/">
            <img src="./images/cricket.svg" alt="sports" />
          </a>
          <div className="title-name">Fantacy</div>
        </li>
        <li className="truncate all-sports">
          <a href="/">
            <img src="./images/cricket.svg" alt="sports" />
          </a>
          <div className="title-name">Aviator</div>
        </li>
      </ul>
    </div>
  );
};

export default Bottomnav;
