import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import classes from './Facebook.module.css';
import * as actions from '../../../store/actions/index';

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
    const fbData = {
      idFacebook: response.id,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      accessToken: response.accessToken
    };
    this.props.onSingInFacebook(fbData);
  };

  componentClicked = () => console.log('clicked');

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          isDisabled={this.props.disabled}
          textButton="Continue with Facebook"
          size="small"
          appId="2483517738600678"
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

const mapDispatchToProps = dispatch => ({
  onSingInFacebook: fbData => dispatch(actions.signInOauth(fbData))
});

export default connect(null, mapDispatchToProps)(Facebook);
