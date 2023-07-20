import React from 'react';
// import '../styles.css';

const Sidebar = () => {  
  return (
    <div className="col-md-3 col-sm-12 col-12 first-sidebar">
                    <nav id="sidebar">
                        <ul className="list-unstyled components">
                            <li className="all-sports">
                                <a href="#"><span className="image-outer"><img src="images/all-Sports.png"/></span> All
                                    Sports</a>
                                <span className="calender-img"><img src="images/calender.png"/></span>
                            </li>
                            <li className="active">
                                <a href="#Cricket" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Cricketball.png"/></span> Cricket</a>
                                <ul className="collapse list-unstyled" id="Cricket">
                                    <li>
                                        <a href="#">Cricket Team 1</a>
                                    </li>
                                    <li>
                                        <a href="#">Cricket Team 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Cricket Team 3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Tennis" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Tennis.png"/></span> Tennis</a>
                                <ul className="collapse list-unstyled" id="Tennis">
                                    <li>
                                        <a href="#">Tennis Team 1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Soccer" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Football.png"/></span> Soccer</a>
                                <ul className="collapse list-unstyled" id="Soccer">
                                    <li>
                                        <a href="#">Soccer Team 1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Basketball" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Basketball.png"/></span> Basketball</a>
                                <ul className="collapse list-unstyled" id="Basketball">
                                    <li>
                                        <a href="#">Basketball Team 1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Rugby" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Rugbyball.png"/></span> Rugby</a>
                                <ul className="collapse list-unstyled" id="Rugby">
                                    <li>
                                        <a href="#">Rugby Team 1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Baseball" data-toggle="collapse" aria-expanded="false"
                                    className="dropdown-toggle"><span className="image-outer"><img
                                            src="images/Baseball-01.png"/></span> Baseball</a>
                                <ul className="collapse list-unstyled" id="Baseball">
                                    <li>
                                        <a href="#">Baseball Team 1</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/hource-racing.png"/></span> Horse
                                    Racing</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/greyhound-racing.png"/></span>
                                    Greyhound Racing</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/Valleyball-01 1.png"/></span>
                                    Volleyball</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/Boxing.png"/></span> Boxing</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/ice-hocky.png"/></span> Ice
                                    Hocky</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/Snooker.png"/></span> Snooker</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/Bike.png"/></span> Racing</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/chess.png"/></span> Chess</a>
                            </li>
                            <li>
                                <a href="#"><span className="image-outer"><img src="images/e-game.png"/></span> E Gaming</a>
                            </li>
                        </ul>
                    </nav>
                </div>
  );
};

export default Sidebar;