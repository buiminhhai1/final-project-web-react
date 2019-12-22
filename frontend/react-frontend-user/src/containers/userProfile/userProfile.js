import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Avatar, Badge, Rate, Tag, message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';

import {
  getTeacher,
  sendFirstMessage,
  createContract
} from '../../store/actions/teaching';
import { resetErrorMessage } from '../../store/actions/auth';
import FloatButtons from '../../components/FloatButtons/FloatButtons';
import './userProfile.css';
import ChatModal from './ChatModal/ChatModal';
import HireModal from './HireModal/HireModal';

const queryString = require('query-string');

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatVisible: false,
      hireVisible: false,
      teacherId: queryString.parse(this.props.location.search).userId
    };
  }

  componentDidMount() {
    this.props.getTeacher(this.state.teacherId);
  }

  componentDidUpdate() {
    if (this.props.message) {
      this.render.successMessage = message.success(this.props.message, 1);
      this.setState({ chatVisible: false, hireVisible: false });
    }
    if (this.props.error)
      this.render.errorMessage = message.error(this.props.error, 1);
    this.props.resetErrorMessage();
  }

  sendMessage(message) {
    const token = 'Bearer ' + this.props.token;
    this.props.sendFirstMessage(token, {
      idUser: this.props.user.userId,
      idUser1: this.props.user.userId,
      idUser2: this.state.teacherId,
      message
    });
  }

  handleHireTeacher(data, teacher) {
    const token = 'Bearer ' + this.props.token;

    this.props.createContract(token, {
      student: {
        _id: this.props.user.userId,
        name: this.props.user.name,
        email: this.props.user.email
      },
      teacher: {
        _id: this.state.teacherId,
        name: teacher.name,
        email: teacher.email
      },
      hourRate: teacher.status.hourRate,
      totalHourCommit: data.time,
      from: data.date[0],
      to: data.date[1]
    });
  }

  render() {
    const { teacher } = this.props;
    const successMessage = null;
    const errorMessage = null;

    return (
      <div className="py-4">
        {successMessage}
        {errorMessage}
        <Spin tip="Loading..." spinning={this.props.pending}>
          <Container className="shadow p-3 bg-white">
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex">
                <Badge
                  status={
                    teacher.status && teacher.status.availability === true
                      ? 'success'
                      : 'danger'
                  }
                >
                  <Avatar
                    className="border"
                    shape="square"
                    src={teacher.imageUrl}
                    size={100}
                  />
                </Badge>
                <div className="ml-3">
                  <h3>{teacher.name}</h3>
                  <h6 className="mb-2">
                    <b>
                      {teacher.experience && teacher.experience.location.city}
                    </b>
                  </h6>
                  <i className="fas fa-map-marker-alt fa-lg mr-2"></i>
                  {teacher.experience &&
                    teacher.experience.location.district.map(place => (
                      <Tag key={place._id} color="#20232A">
                        {place.name}
                      </Tag>
                    ))}
                </div>
              </div>
              <div>
                <h5>Rating:</h5>
                <Rate allowHalf defaultValue={teacher.totalScore} disabled />
              </div>
            </div>
            <div className="mb-3">
              <h5>
                <i className="fas fa-portrait fa-lg mr-2"></i>
                <b>Description</b>
              </h5>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {teacher.experience &&
                  teacher.experience.introduction.description}
              </p>
            </div>
            <Row>
              <Col sm>
                {teacher.status && (
                  <h5
                    className="d-flex align-items-center"
                    style={{ color: '#000' }}
                  >
                    <b>$</b>
                    {teacher.status.hourRate}
                  </h5>
                )}
                <p>Hourly rate</p>
              </Col>
              <Col sm>
                {teacher.status && (
                  <h5 style={{ color: '#000' }}>
                    {teacher.status.timeCommit} <b>hrs</b>
                  </h5>
                )}
                <p>Per week</p>
              </Col>
            </Row>
          </Container>
          <Container className="shadow mt-5 p-3 bg-white">
            <div className="mb-3">
              <h5>
                <i className="fas fa-user-graduate fa-lg mr-2"></i>
                <b>Subjects</b>
              </h5>
              {teacher.experience &&
                teacher.experience.skill.map(subject => (
                  <Tag key={subject._id} color="#20232A">
                    {subject.title}
                  </Tag>
                ))}
            </div>
          </Container>
          <Container className="shadow mt-5 p-3 bg-white">
            <div className="mb-3">
              <h5>
                <i className="fas fa-tasks fa-lg mr-2"></i>
                <b>Projects & Feedbacks</b>
              </h5>
              {teacher.contract &&
                teacher.contract.map(contract => <p>Contract</p>)}
            </div>
          </Container>
          {this.props.user.userId !== this.state.teacherId && (
            <FloatButtons
              setChatVisible={() =>
                this.setState({
                  chatVisible: !this.state.chatVisible
                })
              }
              setHireVisible={() =>
                this.setState({
                  hireVisible: !this.state.hireVisible
                })
              }
            />
          )}
          <ChatModal
            visible={this.state.chatVisible}
            sendMessage={message => this.sendMessage(message)}
            close={() => this.setState({ chatVisible: false })}
            loading={this.props.pending}
          />
          <HireModal
            visible={this.state.hireVisible}
            hireTeacher={data => this.handleHireTeacher(data, teacher)}
            close={() => this.setState({ hireVisible: false })}
            loading={this.props.pending}
            hourPay={teacher.status && teacher.status.hourRate}
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
  user: state.authReducer.user,
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTeacher,
      sendFirstMessage,
      resetErrorMessage,
      createContract
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
