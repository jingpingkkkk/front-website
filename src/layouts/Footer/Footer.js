import React from 'react';

const Footer = () => {  
    
  return (
    <div className="row footer-row">
                <div className="col-md-3 col-sm-12 col-12"></div>
                <div className="col-md-6 col-sm-12 col-12 footer-area">
                    <footer className="footer">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-12">
                                <div className="logo"><a href="#"><img src="images/logo.png"/></a></div>
                                <div className="footer-about-us">
                                    This website is operated by Seven Investments America N.V., registered in Curaçao
                                    under the number 152581, with the address at Zuikertuintjeweg Z/N (Zuikertuin
                                    Tower), Curaçao.
                                </div>
                                <div className="support-image"><img src="images/support-inmage.png"/></div>
                                <div className="social-feeds">
                                    <div className="icon"><a href="#"><img src="images/watsapp.png"/></a></div>
                                    <div className="icon"><a href="#"><img src="images/facebook.png"/></a></div>
                                    <div className="icon"><a href="#"><img src="images/insta.png"/></a></div>
                                    <div className="icon"><a href="#"><img src="images/telegram.png"/></a></div>
                                    <div className="icon"><a href="#"><img src="images/twitter.png"/></a></div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12 col-12">
                                <div className="footer-right-col">
                                    <div className="footer-title">Company Information</div>
                                    <div className="footer-menu">
                                        <ul className="menu-items">
                                            <li className="menu">
                                                <a href="#" className="items">About Us</a>
                                            </li>
                                            <li className="menu">
                                                <a href="#" className="items">Terms & Condition</a>
                                            </li>
                                            <li className="menu">
                                                <a href="#" className="items">Responsible Gaming</a>
                                            </li>
                                            <li className="menu">
                                                <a href="#" className="items">Blog</a>
                                            </li>
                                            <li className="menu">
                                                <a href="#" className="items">AML Policy</a>
                                            </li>
                                            <li className="menu">
                                                <a href="#" className="items">KYC Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-box">
                                        <div className="footer-top">
                                            <div className="d-inline-block footer-other">
                                                <a href="#">
                                                    <img src="images/18plus.png"/>
                                                </a>
                                                <a href="#" target="_blank">
                                                    <img src="images/gamecare.png"/>
                                                </a>
                                                <a href="#" target="_blank">
                                                    <img src="images/gt.png"/>
                                                </a>
                                            </div>
                                            <div className="secure-logo">
                                                <div className="ml-2">
                                                    <b>100% SAFE</b>
                                                    <div>Protected connection and encrypted data.</div>
                                                </div>
                                                <div>
                                                    <img src="images/ssl.png"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer-bottom">
                                            <span className="ws-pre-wrap">The transactions are processed by Seven
                                                Investments LTD registered with the number 12391820, with head office at
                                                Kemp House 160 City Road, London, United Kingdom. For the purpose of
                                                processing payments via Paysafe Group including but not limited to
                                                Neteller and Skrill, the transaction processing entity shall be Seven
                                                Investments America N.V., registered in Curaçao under the number 152581,
                                                with the address at Zuikertuintjeweg Z/N (Zuikertuin Tower),
                                                Curaçao..</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <div className="copyright-text">© 2023 Cricadda.com All Rights Reserved</div>
                </div>
                <div className="col-md-3 col-sm-12 col-12"></div>
            </div>
  );
};

export default Footer;