import React, { useState } from 'react';
// import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './resetPassword.css';
import { resetErrorMessage, resetPassword } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';

const queryString = require('query-string');

function ResetPassword(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const { id } = queryString.parse(props.location.search);

  function validateForm() {
    return password.length > 0 && password === confirmPassword;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.resetPassword(id, password);
  }

  let errorMessage = null;
  let successMessage = null;
  if (props.error) {
    errorMessage = message.error(props.error);
    props.resetErrorMessage();
  }
  if (props.message) {
    successMessage = message.success(props.message);
    props.resetErrorMessage();
  }

  if (props.redirectPage && props.message)
    return <Redirect to={props.redirectPage} />;

  return (
    <div className="ResetPassword">
      <form onSubmit={handleSubmit}>
        {successMessage}
        {errorMessage}
        <div className="form-group" controlId="password">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="confirmPassword">
          <label>Confirm Password</label>
          <input
            className="form-control"
            type="password"
            onChange={e => setComfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button
          className="btn btn-warning"
          block
          disabled={!validateForm() || props.pending}
          type="submit"
        >
          {props.pending ? 'Loading…' : 'SEND'}
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  pending: state.authReducer.pending,
  message: state.authReducer.message,
  error: state.authReducer.error,
  redirectPage: state.authReducer.redirectToPage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPassword,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
