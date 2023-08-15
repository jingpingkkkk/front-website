import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import sideMenuItems from './exchange-menu-items';
import './exchangeMenu.css';

function ExchangeSideMenu({ className = 'd-none d-lg-block' }) {
  const [open, setOpen] = useState('');
  const [subOpen, setSubOpen] = useState('');

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
    setSubOpen('');
  };

  const subToggle = (id) => {
    setSubOpen(id === subOpen ? '' : id);
  };

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

        <Accordion open={open} toggle={toggle}>
          {sideMenuItems.map((item) => (
            <AccordionItem key={item.id}>
              {item.subMenu?.length ? (
                <>
                  <AccordionHeader targetId={item.id}>
                    <div>
                      <span className="image-outer">
                        <img src={item.image} width="20" alt={item.label} />
                      </span>
                      {item.label}
                    </div>

                    <div>
                      <FontAwesomeIcon
                        icon={open === item.id ? faCaretUp : faCaretDown}
                      />
                    </div>
                  </AccordionHeader>

                  <AccordionBody
                    accordionId={item.id}
                    className="bg-black rounded"
                  >
                    <Accordion open={subOpen} toggle={subToggle}>
                      {item.subMenu.map((subItem) => (
                        <AccordionItem key={subItem.id}>
                          {subItem.subMenu?.length ? (
                            <>
                              <AccordionHeader targetId={subItem.id}>
                                <div>{subItem.label}</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={
                                      subOpen === subItem.id
                                        ? faCaretUp
                                        : faCaretDown
                                    }
                                  />
                                </div>
                              </AccordionHeader>

                              <AccordionBody
                                accordionId={subItem.id}
                                className="rounded mx-1"
                                style={{ background: '#101215' }}
                              >
                                <Link
                                  className="sidebar-link"
                                  to={subItem.link}
                                >
                                  {subItem.label}
                                </Link>
                              </AccordionBody>
                            </>
                          ) : (
                            <Link className="sidebar-link" to={subItem.link}>
                              {subItem.label}
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
                    <img src={item.image} width="20" alt={item.label} />
                  </span>
                  <Link className="sidebar-link" to={item.link}>
                    {item.label}
                  </Link>
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </ul>
    </nav>
  );
}

export default ExchangeSideMenu;
