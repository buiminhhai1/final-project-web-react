import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  Table,
  Spin,
  Icon,
  Tag,
  Avatar,
  Input,
  Popover,
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

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractColumns: [
        {
          title: 'Teacher Detail',
          dataIndex: 'teacher',
          key: 'teacher',
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
      ]
    };
  }

  componentDidMount() {
    this.props.onGetListContract();
    // switch (this.props.location.pathname + '') {
    //   case '/':
    //     this.props.onGetListUser(TypeDefine.All);
    //     break;
    //   case '/students':
    //     this.props.onGetListUser(TypeDefine.Student);
    //     break;
    //   case '/teachers':
    //     this.props.onGetListUser(TypeDefine.Teacher);
    //     break;
    //   default:
    //     this.props.onGetListUser(TypeDefine.All);
    //     break;
    // }
  }

  componentDidUpdate() {
    // this.props.onRefreshMessage();
    // if (this.props.error) {
    //   this.render.actionMessage = message.error(this.props.message);
    // } else if (this.props.message) {
    //   this.render.actionMessage = message.success(this.props.message);
    // }
  }

  render() {
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
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.contract.loading,
  contractData: state.contract.contractData,
  error: state.contract.error,
  message: state.contract.message
});

const mapDispatchToProps = dispatch => ({
  onGetListContract: () => dispatch(actions.getListContract())
});

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
