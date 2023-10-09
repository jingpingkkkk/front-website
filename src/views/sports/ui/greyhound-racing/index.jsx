/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import '../../../matches/ui/matches.css';

function GreyhoundRacing({ events, sportName }) {
  const imgPath = menuImages[sportName] || '';
  console.log(events);

  return (
    <div className="comman-bg mb-0">
      <div className="bet-table-header d-flex sport4 d-none-mobile">
        <div className="game-title justify-content-start">
          <img src={imgPath} alt={sportName} className="sports-image" />
          <span className="ms-1">{sportName || ''}</span>
        </div>
        <div className="point-title">1</div>
        <div className="point-title">X</div>
        <div className="point-title">2</div>
      </div>
      <div className="bet-table-body">
        <div className="horse-tab race65">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a data-toggle="tab" href="/" className="nav-link active">
                GB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GreyhoundRacing;
