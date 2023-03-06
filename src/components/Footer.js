import React from "react";
import { Link } from "react-router-dom";
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-4 pb-3">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find Our Company</h4>
                  <span>420p, los gages street, usa</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>63733212311</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>superserver@service.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-4 pb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link className="navbar-brand" to="/">
                    <h5 className="footer_logo">SuperService</h5>
                  </Link>
                </div>
                <div className="footer-text">
                  <p>SuperService Company is Asia's largest online home services platform.  Launched in 2014, SuperService Company today operates in India, Singapore, the USA, the UAE and The Kingdom of Saudi Arabia. The platform helps customers book reliable & high quality services. </p>
                </div>
                <div className="footer-social-icon">
                  <Link to="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-pinterest"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <Link to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Service
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button><i className="fab fa-telegram-plane"></i></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="text-center text-lg-left">
              <div className="copyright-text">
                <p>Copyright &copy; 2023, All Right Reserved <Link to="">SuperServiceCompany</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
