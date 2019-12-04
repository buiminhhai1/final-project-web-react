import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Login.css';
import Facebook from '../Facebook/Facebook';
import Google from '../Google/Google';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const form = (
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
              prefix={
                <Icon
                  type="user"
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              placeholder="Email"
            />
          )}{' '}
        </Form.Item>{' '}
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
              prefix={
                <Icon
                  type="lock"
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              type="password"
              placeholder="Password"
            />
          )}{' '}
        </Form.Item>{' '}
        <Form.Item>
          {' '}
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox> Remember me </Checkbox>)}{' '}
          <NavLink className="login-form-forgot" to="/">
            Forgot password{' '}
          </NavLink>{' '}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <NavLink to="/admin/register"> register now! </NavLink>{' '}
        </Form.Item>{' '}
      </Form>
    );
    return (
      <div className="login">
        <h2>Login with Admin rule</h2>
        {form}
        Connect with <Facebook /> Or <Google />
      </div>
    );
  }
}

export default Form.create({
  name: 'login'
})(Login);
