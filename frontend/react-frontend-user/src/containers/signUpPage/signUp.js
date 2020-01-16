import React, { useState } from 'react';
// import { FormGroup, FormControl, label, Button } from 'react-bootstrap';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './signUp.css';
import { signUp, resetErrorMessage } from '../../store/actions/auth';
import {
  getAuthError,
  getAuthPending,
  getAuthToken,
  getAuthRedirectPage
} from '../../store/reducers/auth';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const [name, setName] = useState('');

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword &&
      name.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    props.signUp(email, password, name);
  }

  if (props.token != null) {
    return <Redirect to={props.redirectPage} />;
  }

  let errorMeassage = null;
  if (props.error) {
    errorMeassage = message.error(props.error);
    props.resetErrorMessage();
  }

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        {errorMeassage}
        <div className="form-group" controlId="email">
          <label>Email</label>
          <input className="form-control"
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="name">
          <label>Name</label>
          <input className="form-control"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="password">
          <label>Password</label>
          <input className="form-control"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="confirmPassword">
          <label>Confirm Password</label>
          <input className="form-control"
            type="password"
            onChange={e => setComfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          block
          disabled={!validateForm() || props.pending}
          type="submit"
        >
          {props.pending ? 'Loading' : 'REGISTER'}
        </button>
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
      signUp,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
