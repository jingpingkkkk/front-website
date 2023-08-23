/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import setData from '../../../../redux/action';

function BatSlip() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
  };
  const toggleBetSlip = () => {
    dispatch(setData());
  };

  const data = useSelector((state) => state.data.payload);
  const ammountArray = [1, 2, 5, 10, 20, 25, 50, 75, 90, 95];

  const onClickAmmount = (amount) => {
    setBetAmount(`${amount}000`);
  };

  return (
    <div className="col-md-12 col-sm-12 col-12 last-sidebar comman-bg right-sidebar casino-right-sidebar d-none d-lg-block">
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
      {data ? (
        <div className="betting-sec">
          <div className="pramotion-title">BET SLIP</div>
          <div className="betting-dashboard">
            <div className="dashboard-data">
              <div className="buttonset">
                <div className="bet-amount-block">
                  <div className="bet-amount-disc">
                    <div className="betting-user-disc">
                      <div className="d-flex justify-content-between">
                        <div className="name">MATCH_ODDS</div>
                        <button
                          type="button"
                          onClick={toggleBetSlip}
                          className="close-bet float-right"
                        >
                          <img
                            src="./images/close.svg"
                            alt="close"
                            className="w-75 h-75"
                          />
                        </button>
                      </div>
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
