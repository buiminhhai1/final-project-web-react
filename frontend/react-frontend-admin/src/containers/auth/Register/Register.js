import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Form, Input, Button, Tooltip, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import Facebook from '../Facebook/Facebook';
import Google from '../Google/Google';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const isSignup = {
          value: true,
          username: values.username
        };
        this.props.onAuth(values.email, values.password, isSignup);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 8
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 8
        },
        sm: {
          span: 8
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const myForm = (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="Register"
      >
        <Form.Item label="E-mail">
          {' '}
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}{' '}
        </Form.Item>{' '}
        <Form.Item
          label={
            <span>
              Username & nbsp;{' '}
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>{' '}
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your Username!',
                whitespace: true
              }
            ]
          })(<Input />)}{' '}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {' '}
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}{' '}
        </Form.Item>{' '}
        <Form.Item label="Confirm Password" hasFeedback>
          {' '}
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}{' '}
        </Form.Item>{' '}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <div>
          <p
            style={{
              color: 'Red',
              background: 'gray',
              textAlign: 'center'
            }}
          >
            {' '}
            {this.props.message}{' '}
          </p>{' '}
        </div>
      );
    }

    let authRedirect = null;
    if (this.props.isRegisterSuccess && !this.props.message) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div class="Register">
        <h2>Register to with admin</h2>
        {authRedirect}
        {errorMessage}
        {myForm}
        Or connect with <Facebook />
        <Google />
      </div>
    );
  }
}

export default Form.create({
  name: 'register'
})(Register);
