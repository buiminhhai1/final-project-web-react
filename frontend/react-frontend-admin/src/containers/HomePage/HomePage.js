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
  // message,
  Col,
  Row,
  Button
} from 'antd';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import './HomePage.css';

const { Text } = Typography;
const { Search } = Input;
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
      title: '',
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
                  <NavLink to="/" sytle={{ paddingRight: '5px' }}>
                    {record.name}
                  </NavLink>
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
            return (
              <div>
                <Tag visible={record.isTeacher} color="#87d068">
                  Teacher
                </Tag>
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
            const btnBlock = record.isBlocking ? (
              <Button type="danger">Block</Button>
            ) : null;
            const btnUnBlock = !record.isBlocking ? (
              <Button type="primary">Unblock</Button>
            ) : null;
            return (
              <div>
                {btnUnBlock}
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
    if (this.props.userData.length > 0) {
      // console.log('user data');
      // console.log(this.props.userData);
    }
    // this.props.onRefreshMessage();
    // if (this.props.error) {
    //   this.render.actionMessage = message.error(this.props.message);
    // } else if (this.props.message) {
    //   this.render.actionMessage = message.success(this.props.message);
    // }
  }

  handleDeleteForm = async () => {
    const { _id } = this.state;
    await this.props.onDeleteSkill(_id);
    this.setState({
      visibleConfirm: false,
      confirmLoading: false
    });
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
    this.setState({ title: value });
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
          <Col span={1} offset={16}>
            <Button type="primary" onClick={this.addNewSkill}>
              Add
            </Button>
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
                  title={this.state.modalName}
                  visible={visible}
                  onOk={this.handleSubmitUpdateForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                >
                  <div>
                    <div>
                      Title
                      <span style={{ color: 'red', marginBottom: '5px' }}>
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
                  <span>
                    Do you want to delete
                    {this.state.title}
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
  loading: state.user.loading,
  userData: state.user.userData,
  error: state.user.error,
  message: state.user.message
});

const mapDispatchToProps = dispatch => ({
  onGetListUser: type => dispatch(actions.getListUser(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
