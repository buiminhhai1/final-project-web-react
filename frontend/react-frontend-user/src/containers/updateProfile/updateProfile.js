import React from 'react';
import {
  Form,
  Input,
  Select,
  Cascader,
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
        console.log(values);

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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
      </Select>,
    );

    const addressOptions = [
      {
        value: 'Ho Chi Minh',
        label: 'Ho Chi Minh',
        children: [
          {
            value: 'District 1',
            label: 'District 1',
          },
          {
            value: 'District 2',
            label: 'District 2',
          },
          {
            value: 'District 3',
            label: 'District 3',
          },
        ],
      },
      {
        value: 'Ha Noi',
        label: 'Ha Noi',
        children: [
          {
            value: 'Hoan Kiem',
            label: 'Hoan Kiem',
          },
          {
            value: 'Đống Đa',
            label: 'Đống Đa',
          },
          {
            value: 'Ba Đình',
            label: 'Ba Đình',
          },
        ],
      },
    ];

    function handleAddressChange(value) {
      console.log(value);
    }

    const addressSelector = (
      <Cascader options={addressOptions} onChange={handleAddressChange} placeholder="Please select" />
    );

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
            })(<Input placeholder="Enter address" addonAfter={addressSelector} />)}
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