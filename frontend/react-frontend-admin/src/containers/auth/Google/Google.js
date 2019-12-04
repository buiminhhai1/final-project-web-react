import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import classes from './Google.module.css';

class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      name: '',
      email: '',
      picture: ''
    };
  }

  responseGoogle = response => {
    console.log(response);
    // this.props.onAuthFacebook(response);
  };

  componentClicked = () => console.log('clicked');

  render() {
    let ggContent;
    if (this.state.isLoggedIn) {
      ggContent = null;
    } else {
      ggContent = (
        <GoogleLogin
          clientId="520556548555-saaoeeulltifvrmilmhag3ds6u19rjt9.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      );
    }
    return <div className={classes.Facebook}> {ggContent} </div>;
  }
}

export default Google;
