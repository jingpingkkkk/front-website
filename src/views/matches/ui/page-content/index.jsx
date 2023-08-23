/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';
import './matches.css';
import { useDispatch } from 'react-redux';
import matchItems from './items';
import setData from '../../../../redux/action';
import useScreenWidth from '../../../../hooks/use-screen-width';
import BetSlipPopup from '../bet-slip-popup';

function MatchPageContent() {
  const dispatch = useDispatch();
  const { isMobile, isTablet } = useScreenWidth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const sendDataToBetSlip = (eventName, runner, price) => {
    const dataToSend = {
      eventName: eventName || '',
      runner: runner || '',
      price: price || 0,
    };
    dispatch(setData(dataToSend));
    setIsLoginModalOpen(isMobile || isTablet);
  };

  return (
    <div className="comman-bg">
      <UncontrolledAccordion stayOpen>
        {matchItems.map((item) => {
          return (
            <AccordionItem key={item?.id}>
              <AccordionHeader targetId={item?.id} className="bet-table-header">
                <div>MATCH_ODDS</div>
                <div className="btn btn-success btn-sm disabled">Cashout</div>
                <span className="max-bet d-none-desktop">
                  <span title="Max : 1">
                    Max:
                    <span>1</span>
                  </span>
                </span>
              </AccordionHeader>

              <AccordionBody accordionId={item?.id}>
                <div className="bet-table-row d-none-mobile">
                  <div className="nation-name">
                    <span className="max-bet">
                      <span title="Max : 1">
                        Max:
                        <span>1</span>
                      </span>
                    </span>
                  </div>
                  <div className="back bl-title back-title">Back</div>
                  <div className="lay bl-title lay-title">Lay</div>
                </div>
                {item?.matches?.map((match) => {
                  return (
                    <div key={match?.runner}>
                      <div className="bet-table-mobile-row d-none-desktop">
                        <div className="bet-table-mobile-team-name">
                          <span>{match?.runner || ''}</span>
                        </div>
                      </div>
                      <div className="bet-table-row">
                        <div className="nation-name d-none-mobile">
                          <p>
                            <span>{match?.runner || ''}</span>
                            <span className="float-right" />
                          </p>
                          <p className="mb-0" />
                        </div>
                        {match?.back?.map((mback) => (
                          <button
                            type="button"
                            className={`bl-box back back${mback?.level}`}
                            key={mback?.level}
                            onClick={() => {
                              sendDataToBetSlip(
                                item?.eventName,
                                match?.runner,
                                mback?.price,
                              );
                            }}
                          >
                            <span className="d-block odds">
                              {mback?.price || 0}
                            </span>
                            <span className="d-block">{mback?.size || 0}</span>
                          </button>
                        ))}
                        {match?.lay?.map((mlay) => (
                          <button
                            type="button"
                            className={`bl-box lay lay${mlay?.level}`}
                            key={mlay?.level}
                            onClick={() => {
                              sendDataToBetSlip(
                                item?.eventName,
                                match?.runner,
                                mlay?.price,
                              );
                            }}
                          >
                            <span className="d-block odds">
                              {mlay?.price || 0}
                            </span>
                            <span className="d-block">{mlay?.size || 0}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </UncontrolledAccordion>
      <BetSlipPopup isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
    </div>
  );
}

export default MatchPageContent;
