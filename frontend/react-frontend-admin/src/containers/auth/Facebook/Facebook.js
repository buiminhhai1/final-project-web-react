import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import classes from './Facebook.module.css';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      name: '',
      email: '',
      picture: ''
    };
  }

  responseFacebook = response => {
    console.log(response);
    // this.props.onAuthFacebook(response);
  };

  componentClicked = () => console.log('clicked');

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          textButton="Continue with Facebook"
          size="small"
          appId="444158143149682"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div className={classes.Facebook}>{fbContent}</div>;
  }
}

export default Facebook;
