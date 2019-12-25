import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table, Spin, Rate, Tag, Input, Popover, Col, Row, Icon } from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';

const { Search } = Input;

class Complain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      complainColumns: [
        {
          title: 'Complainer Detail',
          dataIndex: 'complainer',
          key: 'complainer',
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
          title: 'hours & price & value',
          dataIndex: 'hrsprice',
          key: 'hrsprice',
          render: (text, record) => {
            return (
              <div>
                <strong>{record.contract.totalHourCommit + ' hrs'}</strong>
                <br />
                <strong>{record.contract.hourRate + ' $'}</strong>
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
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
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
                <Popover
                  content={<div>Edit status complain</div>}
                  trigger="hover"
                >
                  <Icon type="edit" onClick={this.showModal} />
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
  }

  componentDidUpdate() {}

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
                columns={this.state.complainColumns}
                dataSource={
                  this.props.complainData.length > 0
                    ? this.props.complainData
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
  loading: state.complain.loading,
  complainData: state.complain.complainData,
  error: state.complain.error,
  message: state.complain.message,
  userDetail: state.user.userDetail,
  loadingUser: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  onGetListComplain: () => dispatch(actions.getListComplain()),
  onUpdateStatusComplain: (_id, status) =>
    dispatch(actions.updateStatusComplain(_id, status)),
  onGetDetailUser: userId => dispatch(actions.getDetailUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Complain);
