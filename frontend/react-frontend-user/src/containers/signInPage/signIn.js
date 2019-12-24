import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { message } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {
  getAuthError,
  getAuthPending,
  getAuthToken,
  getAuthRedirectPage
} from '../../store/reducers/auth';
import {
  signIn,
  signInFacebook,
  signInGoogle,
  resetErrorMessage
} from '../../store/actions/auth';

import './signIn.css';

//reads in configuration from a .env file
require('dotenv').config();
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const facebookClientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isPending = props.pending;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.signIn(email, password);
  }

  const responseFacebook = async response => {
    await console.log(response);
    await props.signInFacebook(response.accessToken);
  };

  const responseGoogle = async response => {
    await console.log(response);
    await props.signInGoogle(response.accessToken);
  };

  if (props.token != null) {
    return <Redirect to={props.redirectPage} />;
  }

  if (props.error) {
    message.error(props.error);
    props.resetErrorMessage();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            autoComplete="true"
          />
        </FormGroup>
        <Button
          block
          disabled={!validateForm() || isPending}
          type="submit"
          variant="warning"
        >
          {isPending ? 'Loading…' : 'LOGIN'}
        </Button>
        <GoogleLogin
          clientId={googleClientId}
          render={renderProps => (
            <button
              className="btn btn-danger btn-block my-2"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i className="fab fa-google mr-2"></i>
              Login with Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <FacebookLogin
          appId={facebookClientId}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<i className="fab fa-facebook-f mr-2"></i>}
          cssClass="btn facebook-btn btn-primary btn-block my-2"
        />
        <NavLink className="signUpLink" to="/signUp" exact>
          Don't have account? 
          <b className="mx-1">Sign up</b>
          now
        </NavLink>
        <h6 className="d-flex justify-content-center my-1">
          <b>OR</b>
        </h6>
        <NavLink className="signUpLink" to="/forgotPassword" exact>
          Forgot password?
        </NavLink>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  error: getAuthError(state),
  pending: getAuthPending(state),
  token: getAuthToken(state),
  redirectPage: getAuthRedirectPage(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn,
      signInGoogle,
      signInFacebook,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
