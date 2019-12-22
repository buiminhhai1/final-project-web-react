import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Avatar, Badge, Rate, Tag, Icon } from 'antd';
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
    console.log(teacher);

    return (
      <div className="pt-4">
        <Spin tip="Loading..." spinning={this.props.pending}>
          <Container className="shadow p-3">
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex">
                <Badge status="success" dot size='large'>
                  <Avatar
                    className="border"
                    shape="square"
                    src={teacher.imageUrl}
                    size={90}
                  />
                </Badge>
                <div className="ml-3">
                  <h3>{teacher.name}</h3>
                  <p className="mb-2">
                    {teacher.experience &&
                      teacher.experience.location.district.map(place => (
                        <Tag key={place._id} color="#20232A">
                          {place.name}
                        </Tag>
                      ))}
                  </p>
                  <h6>
                    <b>
                      {teacher.experience && teacher.experience.location.city}
                    </b>
                  </h6>
                </div>
              </div>
              <div>
                <h5>Rating:</h5>
                <Rate allowHalf defaultValue={4} disabled />
              </div>
            </div>
            <div className="mb-3">
              <h5>
                <b>Subjects:</b>
              </h5>
              {teacher.experience &&
                teacher.experience.skill.map(subject => (
                  <Tag key={subject._id} color="#20232A">
                    {subject.title}
                  </Tag>
                ))}
            </div>
            <div className="mb-3">
              <h5>
                <b>Description</b>
              </h5>
              <p style={{whiteSpace: 'pre-wrap'}}>
                {teacher.experience &&
                  teacher.experience.introduction.description}
              </p>
            </div>
          </Container>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.teachingReducer.error,
  pending: state.teachingReducer.pending,
  teacher: state.teachingReducer.teacher
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTeacher
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
