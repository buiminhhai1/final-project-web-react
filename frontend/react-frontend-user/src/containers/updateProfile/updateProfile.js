import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  message
} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Redirect } from 'react-router-dom';

import './updateProfile.css';
import { getAuthToken, getAuthUser } from "../../store/reducers/auth";
import UpdateAvatar from './updateAvatar/updateAvatar';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 9 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 7 },
    sm: { span: 7 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success('Update profile complete')
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));


    if (this.props.user === null) {
      return <Redirect to='/signIn' />
    }
    else {
      return (
        <div>
          <UpdateAvatar />
          <Form className="updateProfile" {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {
                getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: false,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input placeholder={this.props.user.email} disabled></Input>)
              }
            </Form.Item>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name!' }],
              })(
                <AutoComplete
                  dataSource={[this.props.user.name]}
                  placeholder={this.props.user.name}
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: false, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="Website">
              {getFieldDecorator('website', {
                rules: [{ required: false, message: 'Please input website!' }],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="website"
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item label="Address">
              {getFieldDecorator('address', {
                rules: [{ required: false, message: 'Please input address!' }],
              })(
                <AutoComplete
                  placeholder="address"
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default compose(
  Form.create({ name: 'updateProfile' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpdateProfile);