import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Spin, Rate, Tag, Input, Popover, Col, Row, Button } from 'antd';
import 'antd/dist/antd.css';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const { Search } = Input;

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      contractColumns: [
        {
          title: 'Student Detail',
          dataIndex: 'student',
          key: 'student',
          render: (text, record) => {
            const idStudent = record.student.userId;
            return (
              <div>
                <Popover
                  content={<div>View detail Student</div>}
                  trigger="hover"
                >
                  <div
                    onClick={() => {
                      this.getDetailUser(idStudent);
                    }}
                  >
                    <strong style={{ color: '#003a8c' }}>
                      {record.student.name}
                      <br />
                      {record.student.email}
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
          render: (text, record) => {
            const idTeacher = record.teacher.userId;
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
                      {record.teacher.name}
                      <br />
                      {record.teacher.email}
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
                {record.from} <br />
                {record.to}
              </div>
            );
          }
        },
        {
          title: 'hours & price',
          dataIndex: 'hrsprice',
          key: 'hrsprice',
          render: (text, record) => {
            return (
              <div>
                <strong>{record.totalHourCommit + ' hrs'}</strong>
                <br />
                <strong>{record.hourRate + ' $'}</strong>
              </div>
            );
          }
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
          render: (text, record) => {
            return (
              <div>
                <strong>
                  {record.totalHourCommit * record.hourRate + ' $'}
                </strong>
              </div>
            );
          }
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (text, record) => {
            let color;
            let status;
            switch (record.status) {
              case 2:
                color = '#87d068';
                status = 'Success';
                break;
              case 3:
                color = '#f50';
                status = 'Fail';
                break;
              default:
                color = '#2db7f5';
                status = 'Pending';
            }
            return <Tag color={color}>{status}</Tag>;
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
              value={record.score}
              style={{ fontSize: '15px', marginLeft: '0px' }}
            />
          )
        },
        {
          title: 'action',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => {
            return (
              <div>
                <Popover
                  content={<div>View detail Contract</div>}
                  trigger="hover"
                >
                  <NavLink
                    to={{
                      pathname: '/detailcontract',
                      userDetail: record
                    }}
                    contextMenu="view detail"
                    sytle={{ paddingRight: '5px' }}
                  >
                    <Button type="primary" style={{ marginRight: '5px' }}>
                      Detail
                    </Button>
                  </NavLink>
                </Popover>
              </div>
            );
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.props.onGetListContract();
  }

  componentDidUpdate() { }

  getDetailUser = async userId => {
    await this.props.onGetDetailUser(userId);
    await this.setState({
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
                columns={this.state.contractColumns}
                dataSource={
                  this.props.contractData && 
                  this.props.contractData.length > 0
                    ? this.props.contractData
                    : []
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
  message: state.contract.message,
  userDetail: state.user.userDetail,
  loadingUser: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  onGetListContract: () => dispatch(actions.getListContract()),
  onGetDetailUser: userId => dispatch(actions.getDetailUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
