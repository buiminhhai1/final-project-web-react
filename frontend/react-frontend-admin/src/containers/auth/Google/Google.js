import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import * as actions from '../../../store/actions/index';
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
    this.props.onSingInGoogle({
      idGoole: response.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      picture: response.profileObj.imageUrl,
      accessToken: response.accessToken
    });
  };

  componentClicked = () => console.log('clicked');

  render() {
    let ggContent;
    if (this.state.isLoggedIn) {
      ggContent = null;
    } else {
      ggContent = (
        <GoogleLogin
          disabled={this.props.disabled}
          clientId="520556548555-saaoeeulltifvrmilmhag3ds6u19rjt9.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      );
    }
    return <div className={classes.Google}>{ggContent}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  onSingInGoogle: ggData => dispatch(actions.signInOauth(ggData))
});

export default connect(null, mapDispatchToProps)(Google);
