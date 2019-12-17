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
  message,
  Col,
  Row,
  Button
} from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';

const { Search } = Input;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
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
                  await this.setState({
                    visible: true,
                    _id: record._id,
                    title: record.title,
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
                    title: record.title
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
    // const { _id } = this.state;
    // await this.props.onDeleteSkill(_id);
    // this.setState({
    //   visibleConfirm: false,
    //   confirmLoading: false
    // });
  };

  handleSubmitUpdateForm = async () => {
    // this.setState({
    //   confirmLoading: true
    // });
    // const { _id, title } = this.state;
    // if (_id) {
    //   await this.props.onUpdateSkill(_id, title);
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false
    //   });
    // } else {
    //   await this.props.onCreateSkill(title);
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false
    //   });
    // }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleConfirm: false
    });
  };

  onTitleChange = ({ target: { value } }) => {
    // this.setState({
    //   title: value
    // });
  };

  addNewSkill = async () => {
    // this.setState({
    //   visible: true,
    //   _id: '',
    //   title: '',
    //   modalName: 'Add skill'
    // });
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
                console.log('search value');
                console.log(value);
                this.props.onGetListSkill(value);
              }}
              enterButton
            />
          </Col>
          <Col span={1} offset={16}>
            <Button type="primary" onClick={this.addNewSkill}>
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
                >
                  <div>
                    <div>
                      Title
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
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.onTitleChange}
                    />
                  </div>
                </Modal>
                <Modal
                  title={this.state.confirmName}
                  visible={visibleConfirm}
                  onOk={this.handleDeleteForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                >
                  <span>Do you want to delete {this.state.title} </span>
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
