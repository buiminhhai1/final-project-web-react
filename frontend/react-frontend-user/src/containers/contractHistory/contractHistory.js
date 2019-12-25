import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, message, Table, Divider, Icon } from 'antd';
import { Container } from 'react-bootstrap';

import {
  sendRating,
  sendComplain,
  withdrawMoney,
  getContracts, getMoney
} from '../../store/actions/teaching';
import { resetErrorMessage } from '../../store/actions/auth';
import RatingModal from './ratingModal/ratingModal';
import './contractHistory.css';
import ComplainModal from './complainModal/complainModal';
import WithdrawModal from './withdrawModal/withdrawModal';

class contractHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingVisible: false,
      complainVisible: false,
      withdrawVisible: false
    };
  }

  componentDidMount() {
    const token = 'Bearer ' + this.props.token;
    this.props.getContracts(token);
    this.props.getMoney(token);
  }

  componentDidUpdate() {
    if (this.props.message) {
      this.render.successMessage = message.success(this.props.message, 1);
      this.setState({
        ratingVisible: false,
        complainVisible: false,
        withdrawVisible: false
      });
    }
    if (this.props.error)
      this.render.errorMessage = message.error(this.props.error, 1);
    this.props.resetErrorMessage();
  }

  handleRating(data) {
    console.log(data);
    const token = 'Bearer ' + this.props.token;
    this.props.sendRating(token, data);
  }

  handleComplain(message) {
    console.log(message);
    const token = 'Bearer ' + this.props.token;
    this.props.sendComplain(token, message);
  }

  handleWithdraw(data) {
    console.log(data);
    const token = 'Bearer ' + this.props.token;
    this.props.withdrawMoney(token, data);
  }

  render() {
    const successMessage = null;
    const errorMessage = null;

    const columns = [
      {
        title: 'From',
        dataIndex: 'startDate',
        key: 'startDate'
        // render: text => <p>{text}</p>
      },
      {
        title: 'To',
        dataIndex: 'endDate',
        key: 'endDate'
      },
      {
        title: 'Teacher',
        dataIndex: 'teacher',
        key: 'teacher'
      },
      {
        title: 'Total time',
        dataIndex: 'totalTime',
        key: 'totalTime'
      },
      {
        title: 'Balance',
        dataIndex: 'totalCost',
        key: 'totalCost',
        render: text => (
          <p className="m-0">
            <b className="mr-1">$</b>
            {text}
          </p>
        )
      },
      {
        title: 'Rating',
        key: 'action',
        render: () => (
          <span className="d-flex align-items-center">
            <button
              className="btn btn-outline-warning d-flex align-items-center py-1"
              onClick={() => this.setState({ ratingVisible: true })}
            >
              <Icon className="mr-2" type="star" theme="filled" />
              Rating
            </button>
            <Divider type="vertical" />
            <button
              className="btn btn-outline-danger d-flex align-items-center py-1"
              onClick={() => this.setState({ complainVisible: true })}
            >
              <Icon className="mr-2" type="frown" theme="filled" />
              Complain
            </button>
          </span>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      }
    ];

    const status = ["Failed", "Processing", "Done"];
    const data = this.props.contracts.map(contract => {
      return {
        key: contract._id,
        startDate: contract.from,
        endDate: contract.to,
        teacher: contract.nameUserContract,
        totalCost: contract.hourRate,
        totalTime: contract.totalHourCommit,
        status: status[contract.status]
      }
    })

    return (
      <div className="py-4">
        {successMessage}
        {errorMessage}
        <Spin tip="Loading..." spinning={this.props.pending}>
          <Container className="shadow p-3 bg-white">
            <div className="d-flex align-items-end flex-column mb-3">
              <h4>
                <b>$</b>{this.props.money}
              </h4>
              <button
                className="btn btn-outline-success"
                style={{ width: 120 }}
                onClick={() => this.setState({ withdrawVisible: true })}
              >
                Withdraw all
              </button>
            </div>
            <Table className="mt-3" columns={columns} dataSource={data} />
          </Container>
          <RatingModal
            visible={this.state.ratingVisible}
            submitRating={data => this.handleRating(data)}
            close={() => this.setState({ ratingVisible: false })}
            loading={this.props.pending}
          />
          <ComplainModal
            visible={this.state.complainVisible}
            sendComplain={data => this.handleComplain(data)}
            close={() => this.setState({ complainVisible: false })}
            loading={this.props.pending}
          />
          <WithdrawModal
            visible={this.state.withdrawVisible}
            withdrawMoney={data => this.handleWithdraw(data)}
            close={() => this.setState({ withdrawVisible: false })}
            loading={this.props.pending}
          />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.teachingReducer.error,
  message: state.teachingReducer.message,
  pending: state.teachingReducer.pending,
  teacher: state.teachingReducer.teacher,
  money: state.teachingReducer.money,
  contracts: state.teachingReducer.contracts,
  user: state.authReducer.user,
  token: state.authReducer.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetErrorMessage,
      sendRating,
      sendComplain,
      withdrawMoney,
      getContracts, getMoney
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(contractHistory);
