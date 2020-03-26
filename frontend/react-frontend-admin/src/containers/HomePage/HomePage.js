import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  Table,
  Spin,
  Icon,
  Tag,
  Avatar,
  Modal,
  Input,
  Popover,
  message,
  Col,
  Row,
  Button
} from 'antd';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import './HomePage.css';

const { Text } = Typography;
const { Search, TextArea } = Input;
const TypeDefine = {
  All: 0,
  Teacher: 1,
  Student: 2,
  TeacherNonBlock: 3,
  StudentNonBlock: 4,
  TeacherBlock: 5,
  StudentBlock: 6
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '',
      _id: '',
      block: '',
      title: '',
      content: '',
      modalName: '',

      confirmName: 'Delete skill',
      userColumns: [
        {
          title: 'Employee',
          dataIndex: 'employee',
          key: 'employee',
          render: (text, record) => {
            return (
              <div>
                <Avatar
                  shape="square"
                  size="large"
                  src={record.imageUrl ? record.imageUrl : null}
                />
                <div
                  style={{
                    display: 'inline-block',
                    margin: '5px 5px 5px 10px'
                  }}
                >
                  <Popover
                    content={<div>View detail user</div>}
                    trigger="hover"
                  >
                    <NavLink
                      to={{
                        pathname: '/userdetail',
                        userDetail: record
                      }}
                      contextMenu="view detail"
                      sytle={{ paddingRight: '5px' }}
                    >
                      {' ' + record.name + ' '}
                    </NavLink>
                  </Popover>

                  <Icon
                    style={{ visibility: record.verify ? 'visible' : 'hidden' }}
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                </div>
              </div>
            );
          }
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text, record) => (
            <div>
              <Text>{record.email}</Text>
            </div>
          )
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (text, record) => {
            const tagTeacher = record.isTeacher ? (
              <Tag color="#87d068">Teacher</Tag>
            ) : (
              <Tag color="#2db7f5">Student</Tag>
            );
            return (
              <div>
                {tagTeacher}
                <Tag color="red" visible={record.isBlocking}>
                  Blocked
                </Tag>
              </div>
            );
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => {
            const btnBlock = !record.isBlocking ? (
              <Button
                type="danger"
                onClick={() => {
                  this.setState({
                    visible: true,
                    _id: record._id,
                    block: record.isBlocking
                  });
                }}
              >
                Block
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  this.setState({
                    visible: true,
                    _id: record._id,
                    block: record.isBlocking
                  });
                }}
              >
                Unblock
              </Button>
            );
            return (
              <div>
                <NavLink
                  to={{
                    pathname: '/userdetail',
                    userDetail: record
                  }}
                  contextMenu="view detail"
                  sytle={{ paddingRight: '5px' }}
                >
                  <Button type="primary" style={{ marginRight: '5px' }}>
                    Detail
                  </Button>
                </NavLink>
                {btnBlock}
              </div>
            );
          }
        }
      ],
      visible: false,
      visibleConfirm: false,
      confirmLoading: false
    };
  }

  componentDidMount() {
    switch (this.props.location.pathname + '') {
      case '/':
        this.props.onGetListUser(TypeDefine.All);
        break;
      case '/students':
        this.props.onGetListUser(TypeDefine.Student);
        break;
      case '/teachers':
        this.props.onGetListUser(TypeDefine.Teacher);
        break;
      default:
        this.props.onGetListUser(TypeDefine.All);
        break;
    }
  }

  componentDidUpdate() {
    this.props.onRefreshMessage();
    if (this.props.error) {
      this.render.actionMessage = message.error(this.props.message);
    } else if (this.props.message) {
      this.render.actionMessage = message.success(this.props.message);
    }
  }

  showBlockingModal = () => {
    this.setState({
      visible: true,
      content: ''
    });
  };

  handleDeleteForm = async () => {
    const { _id } = this.state;
    await this.props.onDeleteSkill(_id);
    this.setState({
      visibleConfirm: false,
      confirmLoading: false
    });
  };

  handleBlocking = async () => {
    await this.props.onBlockingUser(
      this.state._id,
      !this.state.block,
      this.state.content
    );
    this.setState({
      content: '',
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleConfirm: false
    });
  };

  onChangeContent = ({ target: { value } }) => {
    this.setState({ content: value });
  };

  render() {
    const { visible } = this.state;
    const actionMessage = null;

    return (
      <div>
        <Row style={{ margin: '10px 0 20px 0' }}>
          <Col span={6} offset={0}>
            <Search
              placeholder="input search text"
              // onSearch={value => {
              //   // this.props.onGetListSkill(value);
              // }}
              enterButton
            />
          </Col>
        </Row>
        <Spin spinning={this.props.loading}>
          <div style={{ background: 'white' }}>
            {
              <Table
                columns={this.state.userColumns}
                dataSource={
                  this.props.userData.length > 0 ? this.props.userData : []
                }
                size="middle"
              />
            }
            {actionMessage}
            {this.props.userData ? (
              <div>
                <Modal
                  visible={visible}
                  title="ARE SURE BLOCKING THIS USER ???"
                  onOk={this.handleBlocking}
                  onCancel={this.handleCancel}
                  confirmLoading={this.props.loading}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Return
                    </Button>,
                    <Button
                      key="Block"
                      type={!this.state.block ? 'danger' : 'primary'}
                      onClick={this.handleBlocking}
                      disabled={!this.state.content}
                    >
                      {!this.state.block ? 'Block' : 'Unblock'}
                    </Button>
                  ]}
                >
                  <div>
                    <Text style={{ marginBottom: '10px' }}>
                      Reason <span style={{ color: 'red' }}>*</span>
                    </Text>
                    <TextArea
                      rows={4}
                      value={this.state.content}
                      onChange={this.onChangeContent}
                      placeholder="Reason"
                    />
                  </div>
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
  loading: state.user.loading,
  userData: state.user.userData,
  error: state.user.error,
  message: state.user.message
});

const mapDispatchToProps = dispatch => ({
  onGetListUser: type => dispatch(actions.getListUser(type)),
  onBlockingUser: (_id, block, content) =>
    dispatch(actions.updateUser(_id, block, content)),
  onRefreshMessage: () => dispatch(actions.refreshMessageUUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
