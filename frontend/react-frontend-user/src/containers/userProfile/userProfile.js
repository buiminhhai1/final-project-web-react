import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Avatar, Badge, Rate, Tag } from 'antd';
import { Container } from 'react-bootstrap';

import { getTeacher } from '../../store/actions/teaching';
import './userProfile.css';

const queryString = require('query-string');

class userProfile extends Component {
  componentDidMount() {
    const { userId } = queryString.parse(this.props.location.search);
    this.props.getTeacher(userId);
  }

  render() {
    const { teacher } = this.props;

    return (
      <Spin tip="Loading..." spinning={this.props.pending}>
        <Container className="shadow p-3">
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex">
              <Badge status="success" dot>
                <Avatar shape="square" src={teacher.imageUrl} size={90} />
              </Badge>
              <div className="ml-3">
                <h3>{teacher.name}</h3>
                <b>District 8, HCM City</b>
              </div>
            </div>
            <div>
              <h5>Rating:</h5>
              <Rate allowHalf defaultValue={4} disabled />
            </div>
          </div>
          <div className="mb-3">
            <h4>Subjects: </h4>
            <Tag color="#f50">Math</Tag>
            <Tag color="#2db7f5">Math</Tag>
            <Tag color="#87d068">Math</Tag>
            <Tag color="#108ee9">Math</Tag>
          </div>
        </Container>
      </Spin>
    )
  }
}

const mapStateToProps = state => ({
  error: state.teachingReducer.error,
  pending: state.teachingReducer.pending,
  teacher: state.teachingReducer.teacher,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getTeacher
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userProfile);