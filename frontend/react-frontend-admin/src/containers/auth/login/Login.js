import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, Spin, message } from 'antd';
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './Login.css';
import Facebook from '../Facebook/Facebook';
import Google from '../Google/Google';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLogin(values.email, values.password);
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = message.error(this.props.message);
    }
    let authRedirect = null;
    if (!!this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    const { getFieldDecorator } = this.props.form;
    let form = (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {' '}
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              type="email"
              onChange={this.props.onRefresh}
            />
          )}
        </Form.Item>
        <Form.Item>
          {' '}
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.props.onRefresh}
            />
          )}
        </Form.Item>
        <Form.Item>
          {' '}
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox> Remember me </Checkbox>)}
          <NavLink className="login-form-forgot" to="/">
            Forgot password
          </NavLink>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or
          <NavLink to="/admin/register"> register now! </NavLink>
        </Form.Item>
      </Form>
    );
    if (this.props.loading) {
      form = <Spin size="large" />;
    }

    return (
      <Auxiliary>
        <h2 className="login">Login with Admin rule</h2>
        {authRedirect}
        {errorMessage}
        {form}
        <Facebook disabled={this.props.loading} />
        <Google disabled={this.props.loading} />
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.errorLogin,
  message: state.auth.messageLogin,
  isAuthenticated: state.auth.token,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(actions.login(email, password)),
  onRefresh: () => dispatch(actions.refreshLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'login' })(Login));
