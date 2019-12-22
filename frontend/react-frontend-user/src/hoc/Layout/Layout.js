import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auxiliary from '../Auxiliary/Auxiliary';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false
    };
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerToggleHandler}
        />
        <main style={{ paddingTop: 50 }}>{this.props.children}</main>
        <footer id="footer" className="footer-1">
          <div className="main-footer widgets-dark typo-light">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="widget subscribe no-box">
                    <h5 className="widget-title">
                      Tutor Recommendation<span></span>
                    </h5>
                    <p>
                      This is a platform which makes it easy for students in
                      finding a tutor
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="widget no-box">
                    <h5 className="widget-title">
                      Quick Links<span></span>
                    </h5>
                    <ul className="thumbnail-widget">
                      <li>
                        <div className="thumb-content">
                          <Link to="/">Get Started</Link>
                        </div>
                      </li>
                      <li>
                        <div className="thumb-content">
                          <Link to="/signIn">Sign in</Link>
                        </div>
                      </li>
                      <li>
                        <div className="thumb-content">
                          <Link to="/signUp">Sign up</Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="widget no-box">
                    <h5 className="widget-title">
                      Get Started<span></span>
                    </h5>
                    <p>Get access to your full Training and Marketing Suite.</p>
                    <Link className="btn" to="/signUp">
                      Register Now
                    </Link>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="widget no-box">
                    <h5 className="widget-title">
                      Contact Us<span></span>
                    </h5>
                    <p>
                      <Link to="/" title="Just a doom link">
                        tutorrecommendation@gmail.com
                      </Link>
                    </p>
                    <ul className="social-footer2">
                      <li className="mr-2">
                        <Link
                          title="youtube"
                          target="_blank"
                          to="https://www.youtube.com/"
                        >
                          <i className="fab fa-youtube fa-2x"></i>
                        </Link>
                      </li>
                      <li className="mr-2">
                        <Link
                          to="https://www.facebook.com/"
                          target="_blank"
                          title="Facebook"
                        >
                          <i className="fab fa-facebook fa-2x"></i>
                        </Link>
                      </li>
                      <li className="mr-2">
                        <Link
                          to="https://twitter.com"
                          target="_blank"
                          title="Twitter"
                        >
                          <i className="fab fa-twitter fa-2x"></i>
                        </Link>
                      </li>
                      <li className="mr-2">
                        <Link
                          title="instagram"
                          target="_blank"
                          to="https://www.instagram.com/"
                        >
                          <i className="fab fa-instagram fa-2x"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>Copyright Company Name © 2019. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Auxiliary>
    );
  }
}

export default Layout;
