import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './changePassword.css';
import { resetErrorMessage, changePassword } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';

function ResetPassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');

  function validateForm() {
    return password.length > 0 && password === confirmPassword && oldPassword.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.changePassword(props.user.userId, oldPassword, password);
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
    <div className="ChangePassword">
      <form onSubmit={handleSubmit}>
        {successMessage}
        {errorMessage}
        <FormGroup controlId="old-password">
          <FormLabel>Old password</FormLabel>
          <FormControl
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={e => setComfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
        <Button
          block
          disabled={!validateForm() || props.pending}
          type="submit"
          variant="warning"
        >
          {props.pending ? 'Loading…' : 'SEND'}
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  pending: state.authReducer.pending,
  message: state.authReducer.message,
  error: state.authReducer.error,
  redirectPage: state.authReducer.redirectToPage,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
