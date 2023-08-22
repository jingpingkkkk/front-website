import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Spinner,
} from 'reactstrap';
import './exchangeMenu.css';
import { getRequest } from '../../../api';
import menuImages from './menu-images';

function ExchangeSideMenu({ className = 'd-none d-lg-block' }) {
  const [open, setOpen] = useState('');
  const [subOpen, setSubOpen] = useState('');
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState([]);

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
    setSubOpen('');
  };

  const subToggle = (id) => {
    setSubOpen(id === subOpen ? '' : id);
  };

  const getAllSports = async () => {
    try {
      setLoading(true);
      const result = await getRequest('exchangeHome/sportsList', false);
      if (result?.success) {
        setLoading(false);
        setSports(result?.data || []);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav id="sidebar" className={className}>
      <div className="search-bar">
        <form className="search-container">
          <img
            className="search-icon"
            src="images/search.png"
            alt="search-icon"
          />
          <input type="text" id="search-bar" placeholder="Search" />
        </form>
      </div>

      <ul className="list-unstyled components">
        <li className="all-sports text-deco">
          <Link to="/sports">All Sports</Link>
        </li>
        {!loading ? (
          <Accordion open={open} toggle={toggle}>
            {sports.map((sport) => {
              const imgPath = menuImages[sport?.name] || '';
              return (
                <AccordionItem key={sport?._id}>
                  {sport?.competition?.length ? (
                    <>
                      <AccordionHeader targetId={sport?._id}>
                        <div>
                          <span className="image-outer">
                            <img src={imgPath} width="20" alt={sport.label} />
                          </span>
                          {sport?.name || ''}
                        </div>

                        <div>
                          <FontAwesomeIcon
                            icon={open === sport._id ? faCaretUp : faCaretDown}
                          />
                        </div>
                      </AccordionHeader>

                      <AccordionBody
                        accordionId={sport._id}
                        className="bg-black rounded"
                      >
                        <Accordion open={subOpen} toggle={subToggle}>
                          {sport.competition.map((comp) => (
                            <AccordionItem key={comp._id}>
                              {comp.event?.length ? (
                                <>
                                  <AccordionHeader targetId={comp._id}>
                                    <div>{comp?.name || ''}</div>
                                    <div>
                                      <FontAwesomeIcon
                                        icon={
                                          subOpen === comp._id
                                            ? faCaretUp
                                            : faCaretDown
                                        }
                                      />
                                    </div>
                                  </AccordionHeader>

                                  <AccordionBody
                                    accordionId={comp._id}
                                    className="rounded mx-1"
                                    style={{ background: '#101215' }}
                                  >
                                    {comp?.event?.map((evnt) => (
                                      <Link
                                        key={evnt?._id}
                                        className="sidebar-link"
                                        to={evnt.link}
                                      >
                                        {evnt?.name || ''}THIS
                                      </Link>
                                    ))}
                                  </AccordionBody>
                                </>
                              ) : (
                                <Link className="sidebar-link" to={comp.link}>
                                  {comp?.name || ''}
                                </Link>
                              )}
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionBody>
                    </>
                  ) : (
                    <div className="d-flex align-items-center">
                      <span className="image-outer">
                        <img src={imgPath} width="20" alt={sport.label} />
                      </span>
                      <Link className="sidebar-link" to={sport.link}>
                        {sport?.name || ''}
                      </Link>
                    </div>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <Spinner color="secondary" />
        )}
      </ul>
    </nav>
  );
}

export default ExchangeSideMenu;
