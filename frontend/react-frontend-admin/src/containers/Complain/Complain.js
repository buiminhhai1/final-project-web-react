import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Typography,
  Table,
  Spin,
  Tag,
  Input,
  Popover,
  Col,
  Row,
  Icon,
  Button,
  Rate,
  Modal,
  message
} from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';

const { Search, TextArea } = Input;
const { Text } = Typography;

class Complain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      redirect: '',
      visible: false,
      visibleMessage: false,
      content: '',
      teacher: {},
      student: {},
      complainColumns: [
        {
          title: 'Complainer Detail',
          dataIndex: 'complainer',
          key: 'complainer',
          fixed: 'left',
          width: '140px',
          render: (text, record) => {
            const idComplainer = record.userComplain.userId;
            return (
              <div>
                <Popover
                  content={<div>View detail Complainer</div>}
                  trigger="hover"
                >
                  <div
                    onClick={() => {
                      this.getDetailUser(idComplainer);
                    }}
                  >
                    <strong style={{ color: '#003a8c' }}>
                      {record.userComplain.name}
                      <br />
                      {record.userComplain.email}
                    </strong>
                  </div>
                </Popover>
              </div>
            );
          }
        },
        {
          title: 'Teacher Detail',
          dataIndex: 'teacher',
          key: 'teacher',
          fixed: 'left',
          width: '140px',
          render: (text, record) => {
            const idTeacher = record.contract.teacher.userId;
            return (
              <div>
                <Popover
                  content={<div>Click view detail Teacher</div>}
                  trigger="hover"
                >
                  <div
                    onClick={() => {
                      this.getDetailUser(idTeacher);
                    }}
                  >
                    <strong style={{ color: '#003a8c' }}>
                      {record.contract.teacher.name}
                      <br />
                      {record.contract.teacher.email}
                    </strong>
                  </div>
                </Popover>
              </div>
            );
          }
        },
        {
          title: 'Student Detail',
          dataIndex: 'studentdetail',
          key: 'studentdetail',
          fixed: 'left',
          width: '140px',
          render: (text, record) => {
            const idStudent = record.contract.student.userId;
            return (
              <div>
                <Popover
                  content={<div>Click view detail Student</div>}
                  trigger="hover"
                >
                  <div
                    onClick={() => {
                      this.getDetailUser(idStudent);
                    }}
                  >
                    <strong style={{ color: '#003a8c' }}>
                      {record.contract.student.name}
                      <br />
                      {record.contract.student.email}
                    </strong>
                  </div>
                </Popover>
              </div>
            );
          }
        },
        {
          title: 'From to',
          dataIndex: 'timecontract',
          key: 'timecontract',
          render: (text, record) => {
            return (
              <div>
                {record.contract.from} <br />
                {record.contract.to}
              </div>
            );
          }
        },
        {
          title: 'Detail contract',
          dataIndex: 'hrsprice',
          key: 'hrsprice',
          render: (text, record) => {
            return (
              <div>
                <strong>{record.contract.totalHourCommit + ' hrs'}</strong>
                <br />
                <strong>{record.contract.hourRate + ' $ per hr'}</strong>
                <br />
                <strong>
                  {record.contract.totalHourCommit * record.contract.hourRate +
                    ' $'}
                </strong>
              </div>
            );
          }
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          status: 'rating',
          render: (text, record) => (
            <Rate
              type=""
              disabled
              key="ratingkey"
              allowHalf
              value={record.contract.score}
              style={{ fontSize: '15px', marginLeft: '0px' }}
            />
          )
        },
        {
          title: 'Content',
          dataIndex: 'content',
          key: 'content',
          render: (text, record) => {
            return (
              <div>
                <strong>{record.content}</strong>
              </div>
            );
          }
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          fixed: 'right',
          render: (text, record) => {
            let color;
            let status;
            switch (record.status) {
              case 1:
                color = '#87d068';
                status = 'Approved';
                break;
              case 2:
                color = '#f50';
                status = 'Reject';
                break;
              default:
                color = '#2db7f5';
                status = 'Pending';
            }
            return (
              <div>
                <Tag color={color}>{status}</Tag>
              </div>
            );
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          fixed: 'right',
          render: (text, record) => {
            return (
              <div>
                <Popover
                  content={<div>Edit status complain</div>}
                  trigger="hover"
                >
                  <Icon
                    style={{ marginRight: '10px' }}
                    type="edit"
                    onClick={() => {
                      this.setState({
                        visible: true,
                        _id: record._id
                      });
                    }}
                  />
                </Popover>
                <Popover content={<div>View Chat Detail</div>} trigger="hover">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.setState({
                        visibleMessage: true,
                        teacher: record.contract.teacher,
                        student: record.contract.student
                      });
                      this.onChatMessage(
                        record.contract.teacher.userId,
                        record.contract.student.userId
                      );
                    }}
                  >
                    View Chat
                  </Button>
                </Popover>
              </div>
            );
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.props.onGetListComplain();
    // this.props.onGetChatMessage(
    //   '5e02e151670695178c101a58',
    //   '5e02cc8b1f1cd6108e4e6e0f'
    // );
  }

  componentDidUpdate() {
    if (this.props.error) {
      this.render.actionMessage = message.error(this.props.message);
      this.props.onRefreshMessage();
    } else if (this.props.message) {
      this.render.actionMessage = message.success(this.props.message);
    }
  }

  onChatMessage = async (userId1, userId2) => {
    await this.props.onGetChatMessage(userId1, userId2);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleMessage: false,
      visibleConfirm: false
    });
  };

  onChangeContent = event => {
    this.setState({ content: event.target.value });
  };

  getDetailUser = async userId => {
    await this.props.onGetDetailUser(userId);
    this.setState({
      redirect: (
        <Redirect
          to={{
            pathname: '/contract',
            userDetail: this.props.userDetail
          }}
        />
      )
    });
  };

  handleChangeStatus = async status => {
    await this.props.onUpdateStatusComplain(
      this.state._id,
      status,
      this.state.content
    );
    this.setState({
      content: '',
      visible: false
    });
  };

  render() {
    const { visible, visibleMessage, student, teacher } = this.state;
    const actionMessage = null;
    return (
      <div>
        {this.props.userDetail ? (
          <Redirect
            to={{
              pathname: '/userdetail',
              userDetail: this.props.userDetail
            }}
          />
        ) : null}
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
        <Spin spinning={this.props.loading || this.props.loadingUser}>
          <div style={{ background: 'white' }}>
            {
              <Table
                columns={this.state.complainColumns}
                dataSource={
                  this.props.complainData.length > 0
                    ? this.props.complainData
                    : []
                }
                scroll={{ x: 1250, y: 600 }}
              />
            }
            {actionMessage}
            {this.props.complainData ? (
              <div>
                <Modal
                  key="editmodal"
                  visible={visible}
                  title="ARE SURE BLOCKING THIS USER ???"
                  onOk={this.handleChangeStatus}
                  onCancel={this.handleCancel}
                  confirmLoading={this.props.loading}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="approved"
                      type={'primary'}
                      onClick={() => {
                        this.handleChangeStatus(1);
                      }}
                      disabled={!this.state.content}
                    >
                      Approve
                    </Button>,
                    <Button
                      key="reject"
                      type={'danger'}
                      onClick={() => {
                        this.handleChangeStatus(2);
                      }}
                      disabled={!this.state.content}
                    >
                      Reject
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
                <Modal
                  key="viewlistmodel"
                  visible={visibleMessage}
                  title="List message"
                  onCancel={this.handleCancel}
                  confirmLoading={this.props.loading}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>
                  ]}
                >
                  <div>
                    {this.props.chatList
                      ? this.props.chatList.map(item => {
                          return (
                            <Text
                              key={item._id}
                              style={{ marginBottom: '10px' }}
                            >
                              <strong>
                                {(item.idUser === teacher.userId
                                  ? teacher.email
                                  : student.email) +
                                  ' ' +
                                  '   ' +
                                  item.time}
                              </strong>
                              <br />
                              {item.message}
                            </Text>
                          );
                        })
                      : null}
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
  loading: state.complain.loading,
  complainData: state.complain.complainData,
  error: state.complain.error,
  message: state.complain.message,
  userDetail: state.user.userDetail,
  loadingUser: state.user.loading,
  chatList: state.user.chatList
});

const mapDispatchToProps = dispatch => ({
  onGetListComplain: () => dispatch(actions.getListComplain()),
  onUpdateStatusComplain: (_id, status, content) =>
    dispatch(actions.updateStatusComplain(_id, status, content)),
  onGetDetailUser: userId => dispatch(actions.getDetailUser(userId)),
  onRefreshMessage: () => dispatch(actions.refreshMessageUComplain()),
  onGetChatMessage: (userId1, userId2) =>
    dispatch(actions.getChatList(userId1, userId2))
});

export default connect(mapStateToProps, mapDispatchToProps)(Complain);
