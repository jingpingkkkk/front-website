/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

function BatSlip() {
  const [open, setOpen] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
  };

  const data = useSelector((state) => state.data.payload);

  const ammountArray = [1, 2, 5, 10, 20, 25, 50, 75, 90, 95];

  const onClickAmmount = (amount) => {
    setBetAmount(`${amount}000`);
  };

  return (
    <div className="col-md-12 col-sm-12 col-12 last-sidebar comman-bg right-sidebar casino-right-sidebar">
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1" className="bet-table-header">
            TV
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <div>
              <img
                src="images/screen-3.png"
                alt="img"
                className="w-100 h-100"
              />
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      {/* <span>
        <div className="bet-slip-container">
          <div>
            <h4 className="mb-0 bet-slip-title">Bet Slip</h4>
          </div>
          <div className="bet-slip-box">
            <div className="bet-slip">
              <div className="bet-nation">
                <span>Afghanistan v Pakistan</span>
                <div className="close-bet float-right">
                  <img
                    src="https://wver.sprintstaticdata.com/v9/static/front/img/close.svg"
                    alt="close"
                  />
                </div>
              </div>{' '}
              <div className="match-result">MATCH_ODDS</div>{' '}
              <div className="bet-team">
                <span title="Afghanistan  " className="bet-team-name">
                  Afghanistan
                </span>
                <div className="odds-box float-right">
                  <input type="number" readOnly className="form-control" />{' '}
                </div>
              </div>
            </div>{' '}
            <div className="bet-input back-border">
              <input
                type="text"
                id="placebetAmountWeb1"
                maxLength="9"
                placeholder="Amount"
                className="form-control"
              />
            </div>
            <div className="possible-win">
              <span>Profit: </span> <h1 className="mb-0">108300</h1>
            </div>{' '}
            <div className="bet-buttons">
              <button className="btn btn-primary" type="button">
                <span>1k</span>
              </button>
            </div>{' '}
            <div className="place-bet-btn">
              <button className="btn btn-primary btn-block" type="button">
                <span>Place bet</span>
              </button>
            </div>
          </div>
        </div>
      </span> */}
      {data ? (
        <div className="betting-sec">
          <div className="pramotion-title">BET SLIP</div>
          <div className="betting-dashboard">
            <div className="dashboard-data">
              <div className="buttonset">
                <div className="bet-amount-block">
                  <div className="bet-amount-disc">
                    <div className="betting-user-disc">
                      <div className="name">MATCH_ODDS</div>
                      <div className="disc">{data?.eventName || ''}</div>
                    </div>
                    <div className="points">
                      <div className="category">{data?.runner || ''}</div>
                      <div className="selection">
                        <form action="">
                          <p className="qty">
                            <input
                              type="number"
                              name="qty"
                              id="qty"
                              min="1.55"
                              step="1"
                              defaultValue={data?.price || 0}
                            />
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="type-aminunt form-control"
                    defaultValue={betAmount}
                  />
                  <div className="amount-choose">
                    {ammountArray?.map((amount) => (
                      <button
                        type="button"
                        className="amounts"
                        key={amount}
                        onClick={() => {
                          onClickAmmount(amount);
                        }}
                      >
                        {amount}k
                      </button>
                    ))}
                  </div>
                </div>
                <button className="custom-buttton" type="button">
                  Place bet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BatSlip;
