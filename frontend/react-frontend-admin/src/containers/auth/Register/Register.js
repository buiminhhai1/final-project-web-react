import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Form, Input, Button, Tooltip, Icon, message, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Facebook from '../Facebook/Facebook';
import Google from '../Google/Google';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      email: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ email: values.email });
        this.props.onRegister(values.email, values.password, values.fullname);
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
    this.props.onRefresh();
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
          span: 9
        },
        sm: {
          span: 9
        }
      },
      wrapperCol: {
        xs: {
          span: 6
        },
        sm: {
          span: 6
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0
        },
        sm: {
          span: 12,
          offset: 8
        }
      }
    };

    let myForm = (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="Register"
      >
        <Form.Item label="E-mail">
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
          })(<Input onChange={this.props.onRefresh} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Full name
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('fullname', {
            rules: [
              {
                required: true,
                message: 'Please input your Fullname!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
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
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
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
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );

    if (this.props.loading) {
      myForm = <Spin size="large" />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = message.error(this.props.message);
    }

    let loginRedirect = null;
    if (
      this.props.emailRegister &&
      this.state.email === this.props.emailRegister
    ) {
      loginRedirect = <Redirect to={this.props.loginRedirectPath} />;
    }
    return (
      <div className="Register">
        <h2>Register to with admin</h2>
        {loginRedirect}
        {errorMessage}
        {myForm}
        Connect with
        <Facebook />
        Or
        <Google />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.errorRegister,
  message: state.auth.messageRegister,
  emailRegister: state.auth.emailRegister,
  loginRedirectPath: state.auth.loginRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onRegister: (email, password, name) =>
    dispatch(actions.register(email, password, name)),
  onRefresh: () => dispatch(actions.refreshRegister())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Form.create({
    name: 'register'
  })(Register)
);
