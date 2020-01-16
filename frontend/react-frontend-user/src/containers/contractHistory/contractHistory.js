import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, message, Table, Divider, Icon, Modal } from 'antd';
// import { Container } from 'react-bootstrap';

import {
  sendRating, sendComplain, withdrawMoney, getContracts, getMoney, updateContract, endContract
} from '../../store/actions/teaching';
import { resetErrorMessage } from '../../store/actions/auth';
import RatingModal from './ratingModal/ratingModal';
import './contractHistory.css';
import ComplainModal from './complainModal/complainModal';
import WithdrawModal from './withdrawModal/withdrawModal';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;


class contractHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingVisible: false,
      complainVisible: false,
      withdrawVisible: false,
      endCourseVisible: false,
      removeVisible: false,
      currentContractId: '',
    };
  }

  componentDidMount() {
    const token = 'Bearer ' + this.props.token;
    this.props.getContracts(token);
    this.props.getMoney(token, this.props.user.userId);
  }

  componentDidUpdate() {
    if (this.props.message) {
      this.render.successMessage = message.success(this.props.message, 1);
      this.setState({
        ratingVisible: false,
        complainVisible: false,
        withdrawVisible: false,
        removeVisible: false,
        endCourseVisible: false,
      });
    }
    if (this.props.error)
      this.render.errorMessage = message.error(this.props.error, 1);
    this.props.resetErrorMessage();
  }

  handleRating(data) {
    console.log(data);
    const token = 'Bearer ' + this.props.token;
    let sendData = {
      _id: this.state.currentContractId,
      review: data.message,
      score: data.rate,
    }
    this.props.sendRating(token, sendData);
  }

  handleComplain(messages) {
    // console.log(messages);
    // console.log(this.props.contracts);
    // console.log(this.state.currentContractId);
    let result = false;
    this.props.contracts.map(contract => {
      if (contract._id === this.state.currentContractId) {
        console.log(contract);
        const token = 'Bearer ' + this.props.token;

        const userComplain = {
          userId: this.props.user.userId,
          name: this.props.user.name,
          email: this.props.user.email,
        }

        const userBeComplained = {
          userId: contract.userContractId,
          name: contract.nameUserContract,
          email: contract.emailUserContract,
        }

        const student = this.props.user.isTeacher ? userBeComplained : userComplain;
        const teacher = !this.props.user.isTeacher ? userBeComplained : userComplain;

        const contractData = {
          _id: contract._id,
          student, teacher,
          hourRate: contract.hourRate,
          totalHourCommit: contract.totalHourCommit,
          from: contract.from,
          to: contract.to,
          review: contract.review,
          status: contract.status,
          score: contract.score
        }

        const data = {
          userComplain,
          contract: contractData,
          content: messages
        }
        this.props.sendComplain(token, data);
        result = true;
        return true;
      }
      return false;
    })
    if (!result)
      message.error('Something is wrong with your contractId');
  }

  handleWithdraw(data) {
    console.log(data);
    const token = 'Bearer ' + this.props.token;
    this.props.withdrawMoney(token, { idUser: this.props.user.userId, email: data });
  }

  handleRemove() {
    const token = 'Bearer ' + this.props.token;
    let data = {
      _id: this.state.currentContractId,
      review: '',
      score: '',
      status: -1,
    }
    this.props.updateContract(token, data);
  }

  handleEndCourse() {
    const token = 'Bearer ' + this.props.token;
    this.props.endContract(token, { contractId: this.state.currentContractId });
  }

  render() {
    const successMessage = null;
    const errorMessage = null;

    const status = ["Processing", "Transfered", "Done", "Failed"];

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
        title: 'Contractor',
        dataIndex: 'teacher',
        key: 'teacher'
      },
      {
        title: 'Total time (hours)',
        dataIndex: 'totalTime',
        key: 'totalTime',
      },
      {
        title: 'Balance',
        dataIndex: 'totalCost',
        key: 'totalCost',
        render: text => (
          <p className="m-0">
            <b className="mr-1">$</b>
            {text}/<b>hr</b>
          </p>
        )
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (data) => {
          if (data.index > 0)
            return (
              <span>
                {data.index === 1 ?
                  <div className="d-flex align-items-center">
                    {!this.props.user.isTeacher &&
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-info d-flex align-items-center py-1"
                          onClick={() => this.setState({ endCourseVisible: true, currentContractId: data.id })}
                        >
                          <Icon className="mr-2" type="fast-forward" theme="filled" />
                          End course
                        </button>
                        <Divider type="vertical" />
                      </div>
                    }
                    <button
                      className="btn btn-outline-danger d-flex align-items-center py-1"
                      onClick={() => this.setState({ complainVisible: true, currentContractId: data.id })}
                    >
                      <Icon className="mr-2" type="frown" theme="filled" />
                      Complain
                    </button>
                  </div>
                  :
                  <button
                    className="btn btn-outline-warning d-flex align-items-center py-1"
                    onClick={() => this.setState({ ratingVisible: true, currentContractId: data.id })}
                    disabled={this.props.user.isTeacher}
                  >
                    <Icon className="mr-2" type="star" theme="filled" />
                    Rating
                  </button>
                }
              </span>
            )
          else return (
            <span className="d-flex align-items-center">
              {!this.props.user.isTeacher &&
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-success d-flex align-items-center py-1"
                    onClick={() => {
                      window.location.replace(
                        `${apiUrl}/transaction/payment?contractId=${data.id}&successUrl=${window.location.href}&failedUrl=${window.location.href}`
                      )
                    }}
                  >
                    <Icon className="mr-2" type="dollar-circle" theme="filled" />
                    Checkout
                  </button>
                  <Divider type="vertical" />
                </div>
              }
              <button
                className="btn btn-outline-danger d-flex align-items-center py-1"
                onClick={() => this.setState({ removeVisible: true, currentContractId: data.id })}
              >
                <Icon className="mr-2" type="delete" theme="filled" />
                Remove
            </button>
            </span>
          )
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (index) => (
          <p className="mb-0">{status[index]}</p>
        )
      }
    ];

    const data = this.props.contracts
      .filter(contract => contract.status >= 0).reverse()
      .map(contract => {
        return {
          key: contract._id,
          startDate: contract.from.replace(/-/g, '/'),
          endDate: contract.to.replace(/-/g, '/'),
          teacher: contract.nameUserContract,
          totalCost: contract.hourRate,
          totalTime: contract.totalHourCommit,
          status: contract.status,
          action: { index: contract.status, id: contract._id }
        }
      })

    return (
      <div className="py-4">
        {successMessage}
        {errorMessage}
        <Spin tip="Loading..." spinning={this.props.pending}>
          <div className="container shadow p-3 bg-white">
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
          </div>
          <RatingModal
            visible={this.state.ratingVisible}
            // visible={true}
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
          <Modal
            title="Confirmation"
            visible={this.state.endCourseVisible}
            confirmLoading={this.props.pending}
            onOk={() => this.handleEndCourse()}
            onCancel={() => this.setState({ endCourseVisible: false })}
          >
            <p>Are you sure to end this course sooner than due date?</p>
          </Modal>
          <Modal
            title="Confirmation"
            visible={this.state.removeVisible}
            confirmLoading={this.props.pending}
            onOk={() => this.handleRemove()}
            onCancel={() => this.setState({ removeVisible: false })}
          >
            <p>Are you sure to remove this course?</p>
          </Modal>
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
      resetErrorMessage, sendRating, sendComplain, withdrawMoney,
      getContracts, getMoney, updateContract, endContract
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(contractHistory);
