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

const { Option, OptGroup } = Select;
// const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 7 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 10 },
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
        const phone = values.prefix + values.phone;

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
    // const { autoCompleteResult } = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
      </Select>,
    );

    const selectAddress = (
      <div>
        <Select defaultValue="District/ Ward" style={{ width: 125 }}>
          <OptGroup label="District">
            <Option value="1">District 1</Option>
            <Option value="2">District 2</Option>
            <Option value="3">District 3</Option>
            <Option value="4">District 4</Option>
            <Option value="5">District 5</Option>
            <Option value="6">District 6</Option>
            <Option value="7">District 7</Option>
            <Option value="8">District 8</Option>
            <Option value="9">District 9</Option>
            <Option value="10">District 10</Option>
            <Option value="11">District 11</Option>
            <Option value="12">District 12</Option>
            <Option value="Binh Tan">Binh Tan</Option>
            <Option value="Binh Thanh">Binh Thanh</Option>
            <Option value="Go Vap">Go Vap</Option>
            <Option value="Phu Nhuan">Phu Nhuan</Option>
            <Option value="Tan Binh">Tan Binh</Option>
            <Option value="Tan Phu">Tan Phu</Option>
            <Option value="Thu Duc">Thu Duc</Option>
          </OptGroup>
          <OptGroup label="Ward">
            <Option value="Binh Chanh">Binh Chanh</Option>
            <Option value="Can Gio">Can Gio</Option>
            <Option value="Cu Chi">Cu Chi</Option>
            <Option value="Hoc Mon">Hoc Mon</Option>
            <Option value="Nha Be">Nha Be</Option>
          </OptGroup>
        </Select>
        <Select defaultValue="City" style={{ width: 120, marginLeft: 5 }}>
          <Option value="Ho Chi Minh">Ho Chi Minh</Option>
          <Option value="Ha Noi">Ha Noi</Option>
          <Option value="Da Nang">Da Nang</Option>
          <Option value="Khanh Hoa">Khanh Hoa</Option>
        </Select>
      </div>
    );

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
                  placeholder={"Ex: " + this.props.user.name}
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item label="Address">
              {getFieldDecorator('address', {
                rules: [{ required: false, message: 'Please input address!' }],
              })(<Input placeholder="Enter address" addonAfter={selectAddress} />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: false, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update
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