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

import './updateProfile.css';
import { getAuthToken, getAuthUser, getAuthError } from "../../store/reducers/auth";
import { getLocations } from "../../store/actions/teaching";
import { resetErrorMessage } from "../../store/actions/auth";
import { updateUserProfile } from "../../store/actions/profile";
import UpdateAvatar from './updateAvatar/updateAvatar';

const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
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
      city: 0,
      district: 0,
    }
  }

  componentDidMount() {
    this.props.getLocations();
  }

  componentDidUpdate() {
    if (this.props.error) {
      this.render.errorMessage = message.error(this.props.error);
      this.props.resetErrorMessage();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const token = "Bearer " + this.props.token;
        const phone = values.prefix + '-' + values.phone;
        const location = {
          city: this.props.locations[this.state.city].city,
          district: this.props.locations[this.state.city].district[this.state.district],
        }
        const name = values.name;
        const address = values.address;
        this.props.updateUserProfile(token, {
          phone, location, name, address
        })
      }
    });
  };

  handleAddressChange = value => {
    this.setState({
      city: value[0],
      district: value[1]
    })
  }

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
      ...this.props.locations.map((location, index) => {
        return {
          value: index,
          label: location.city,
          key: location.city,
          children: location.district.map((district, index) => {
            return {
              value: index,
              label: district.name,
              key: district.name,
            }
          })
        }
      })
    ];

    const errorMessage = null;

    return (
      <div>
        {errorMessage}
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
              >
                <Input placeholder={"Ex: " + this.props.user.name} />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please input address!' }],
            })(<Input placeholder="Enter address" />)}
          </Form.Item>
          <Form.Item label="City">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please choose city!' }],
            })(
              <Cascader
                style={{ textAlign: "left" }}
                options={addressOptions}
                onChange={this.handleAddressChange}
                placeholder="Please select city" />
            )}

          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
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
  error: getAuthError(state),
  locations: state.teachingReducer.locations,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getLocations, updateUserProfile, resetErrorMessage
}, dispatch)

export default compose(
  Form.create({ name: 'updateProfile' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpdateProfile);