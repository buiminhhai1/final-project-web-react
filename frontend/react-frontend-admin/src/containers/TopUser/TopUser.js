import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  Table,
  Spin,
  Icon,
  Rate,
  Avatar,
  Input,
  Popover,
  Col,
  Row
} from 'antd';
import 'antd/dist/antd.css';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const { Text } = Typography;
const { Search } = Input;

const TypeDefine = {
  All: 0,
  OneDate: 1,
  OneWeek: 7,
  OneMonth: 30,
  ThreeMonth: 90
};

class TopUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      userColumns: [
        {
          title: 'Employee',
          dataIndex: 'employee',
          key: 'employee',
          render: (text, record) => {
            console.log(record);
            return (
              <div>
                <Avatar
                  shape="square"
                  size="large"
                  src={record.user.imageUrl ? record.user.imageUrl : null}
                />
                <div
                  style={{
                    display: 'inline-block',
                    margin: '5px 5px 5px 10px'
                  }}
                >
                  <Popover
                    content={<div> View detail user </div>}
                    trigger="hover"
                  >
                    <NavLink
                      to={{
                        pathname: '/userdetail',
                        userDetail: record.user
                      }}
                      contextMenu="view detail"
                      sytle={{
                        paddingRight: '5px'
                      }}
                    >
                      {' ' + record.user.name + ' '}
                    </NavLink>
                  </Popover>

                  <Icon
                    style={{
                      visibility: record.user.verify ? 'visible' : 'hidden'
                    }}
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
          render: (text, record) => {
            return (
              <div>
                <Text> {record.user.email ? record.user.email : null} </Text>
              </div>
            );
          }
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          render: (text, record) => {
            return (
              <div>
                <Rate
                  type=""
                  disabled
                  key="ratingkey"
                  allowHalf
                  value={record.user.totalScore ? record.user.totalScore : 0}
                  style={{ fontSize: '15px', marginLeft: '0px' }}
                />
              </div>
            );
          }
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
          render: (text, record) => {
            return <Text strong>{record.value + ' $'}</Text>;
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.props.onGetTopUser(TypeDefine.OneWeek);
  }

  componentDidUpdate() {}

  getDetailUser = async userId => {
    await this.props.onGetDetailUser(userId);
    await this.setState({
      redirect: (
        <Redirect
          to={{
            pathname: '/userdetail',
            userDetail: this.props.userDetail
          }}
        />
      )
    });
  };

  render() {
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
  loading: state.user.loading,
  userData: state.user.userData,
  error: state.user.error,
  message: state.user.message,
  userDetail: state.user.userDetail,
  loadingUser: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  onGetTopUser: numDate => dispatch(actions.getTopUser(numDate)),
  onGetDetailUser: userId => dispatch(actions.getDetailUser(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(TopUser);
