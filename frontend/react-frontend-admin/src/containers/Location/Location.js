import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Spin,
  Icon,
  Divider,
  Tag,
  Modal,
  Input,
  Select,
  message,
  Col,
  Row,
  Button
} from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';

const { Option } = Select;
const { Search } = Input;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      city: '',
      district: [],
      defaultValue: [],
      modalName: '',
      confirmName: 'Delete skill',
      locationColumns: [
        {
          title: 'Thành phố - tỉnh',
          dataIndex: 'city',
          key: 'city',
          render: (text, record) => (
            <span>
              <strong>{record.city}</strong>
            </span>
          )
        },
        {
          title: 'Quận - Huyện',
          key: 'district',
          render: (text, districts) => (
            <span>
              {districts.district.map(district => {
                return (
                  <Tag color={'geekblue'} key={district.name}>
                    <strong>{district.name.toUpperCase()}</strong>
                  </Tag>
                );
              })}
            </span>
          )
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Icon
                type="edit"
                title="edit location"
                onClick={async () => {
                  let defaultSelect = [];
                  let data = [];
                  record.district.forEach(item => {
                    defaultSelect = [...defaultSelect, item.name];
                    data = [
                      ...data,
                      <Option key={item.name}>{item.name}</Option>
                    ];
                  });
                  await this.setState({
                    visible: true,
                    _id: record._id,
                    city: record.city,
                    district: data,
                    defaultValue: defaultSelect,
                    modalName: 'Edit location'
                  });
                }}
              />
              <Divider type="vertical" />
              <Icon
                type="delete"
                title="delete location"
                onClick={async () => {
                  await this.setState({
                    visibleConfirm: true,
                    _id: record._id,
                    city: record.city
                  });
                }}
              />
            </span>
          )
        }
      ],
      visible: false,
      visibleConfirm: false,
      confirmLoading: false
    };
  }

  componentDidMount() {
    this.props.onGetListLocation('');
  }

  componentDidUpdate() {
    this.props.onRefreshMessage();
    if (this.props.error) {
      this.render.actionMessage = message.error(this.props.message);
    } else if (this.props.message) {
      this.render.actionMessage = message.success(this.props.message);
    }
  }

  handleDeleteForm = async () => {
    const { _id } = this.state;
    await this.props.onDeleteLocation(_id);
    this.setState({
      visibleConfirm: false,
      confirmLoading: false
    });
  };

  handleSubmitUpdateForm = async () => {
    await this.setState({
      confirmLoading: true
    });
    const { _id, city } = this.state;
    const district = this.state.defaultValue.map(item => {
      return { name: item };
    });
    if (_id) {
      await this.props.onUpdateLocation(_id, city, district);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    } else {
      await this.props.onCreateLocation(city, district);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }
  };

  handleCancel = async () => {
    await this.setState({
      visible: false,
      visibleConfirm: false
    });
  };

  onCityChange = ({ target: { value } }) => {
    this.setState({
      city: value
    });
  };

  onAddNewLocation = async () => {
    await this.setState({
      visible: true,
      _id: '',
      city: '',
      district: [],
      defaultValue: [],
      modalName: 'Add new location'
    });
  };

  handleChange = async value => {
    const newarr = value.toString().split(',');
    await this.setState({
      defaultValue: newarr
    });
  };

  render() {
    const { visible, confirmLoading, visibleConfirm } = this.state;
    const actionMessage = null;

    return (
      <div>
        <Row
          style={{
            margin: '10px 0 20px 0'
          }}
        >
          <Col span={6} offset={0}>
            <Search
              placeholder="input search text"
              onSearch={value => {
                this.props.onGetListSkill(value);
              }}
              enterButton
            />
          </Col>
          <Col span={1} offset={16}>
            <Button type="primary" onClick={this.onAddNewLocation}>
              Add
            </Button>
          </Col>
        </Row>
        <Spin spinning={this.props.loading}>
          <div
            style={{
              background: 'white'
            }}
          >
            <Table
              columns={this.state.locationColumns}
              dataSource={this.props.locationData}
              size="middle"
            />
            {actionMessage}
            {this.props.locationData ? (
              <div>
                <Modal
                  title={this.state.modalName}
                  visible={visible}
                  onOk={this.handleSubmitUpdateForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="Block"
                      type="primary"
                      onClick={this.handleSubmitUpdateForm}
                      disabled={!(this.state.city && this.state.district)}
                    >
                      Save
                    </Button>
                  ]}
                >
                  <div>
                    <div style={{ marginBottom: '5px' }}>
                      City
                      <span
                        style={{
                          color: 'red',
                          marginBottom: '5px'
                        }}
                      >
                        *
                      </span>
                    </div>
                    <Input
                      placeholder="Location"
                      value={this.state.city}
                      onChange={this.onCityChange}
                    />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ marginBottom: '5px' }}>
                      District
                      <span
                        style={{
                          color: 'red',
                          marginBottom: '5px'
                        }}
                      >
                        *
                      </span>
                    </div>
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Tags Mode"
                      onChange={this.handleChange}
                      value={this.state.defaultValue}
                    >
                      {this.state.district}
                    </Select>
                  </div>
                </Modal>
                <Modal
                  title={this.state.confirmName}
                  visible={visibleConfirm}
                  onOk={this.handleDeleteForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="Block"
                      type="danger"
                      onClick={this.handleDeleteForm}
                      disabled={!this.state._id}
                    >
                      Delete
                    </Button>
                  ]}
                >
                  <span>
                    Do you want delete
                    <strong>{' ' + this.state.city}</strong>
                  </span>
                </Modal>
              </div>
            ) : null}
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locationData: state.location.locationData,
  message: state.location.message,
  error: state.location.error,
  loading: state.location.loading
});

const mapDispatchToProps = dispatch => ({
  onCreateLocation: (city, district) =>
    dispatch(actions.createLocation(city, district)),
  onUpdateLocation: (_id, city, district) =>
    dispatch(actions.updateLocation(_id, city, district)),
  onDeleteLocation: _id => dispatch(actions.deleteLocation(_id)),
  onGetListLocation: searchString =>
    dispatch(actions.getListLocation(searchString)),
  onRefreshMessage: () => dispatch(actions.refreshMessageCRUDLocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
