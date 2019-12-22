import React, { Component } from 'react';
import {
  Button,
  Form,
  Container,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { Radio, Spin, Divider, TreeSelect, message } from 'antd';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './teacherInfoRegister.css';
import { updateTeacherProfile } from '../../store/actions/profile';
import { resetErrorMessage } from '../../store/actions/auth';
import {
  getSubjects,
  getEducationLevel,
  getLevel,
  getLocations,
  getTeacher
} from '../../store/actions/teaching';

const animatedComponents = makeAnimated();
const { TreeNode } = TreeSelect;

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: [],
      selectedEducationLevel: [],
      level: null,
      locations: null,
      hourPay: 0,
      hourWork: 0,
      description: ''
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem('isTeacher'))
      this.props.getTeacher(localStorage.getItem('userId'));
    this.props.getSubjects();
    this.props.getEducationLevel();
    this.props.getLevel();
    this.props.getLocations();
  };

  componentDidUpdate() {
    if (this.props.teachingMessage) {
      let selectedSubject = this.props.teacher.experience.skill.map(
        subject => ({
          value: subject._id,
          label: subject.title,
          data: subject
        })
      );
      let selectedEducationLevel = this.props.teacher.experience.educationLevel.map(
        level => ({
          value: level._id,
          label: level.title,
          data: level
        })
      );

      this.setState({
        selectedSubject,
        selectedEducationLevel,
        level: this.props.teacher.experience.level,
        description: this.props.teacher.experience.introduction.description,
        hourPay: this.props.teacher.status.hourRate,
        hourWork: this.props.teacher.status.timeCommit
      });
    }
    if (this.props.authMessage) {
      this.render.successMessage = message.success(this.props.authMessage);
    }
    if (this.props.authError || this.props.teachingError) {
      this.render.errorMessage = message.error(
        'Something wrong happened! Please try again later'
      );
    }
    this.props.resetErrorMessage();
  }

  handleSubmit = event => {
    if (!this.checkFields()) {
      message.error('Please check all the fields!', 1);
      return;
    }

    let submitSubjects = [];
    this.state.selectedSubject.map(subject => {
      return submitSubjects.push(subject.data);
    });
    let submitEducationLevel = [];
    this.state.selectedEducationLevel.map(level => {
      return submitEducationLevel.push(level.data);
    });
    let submitLevel = this.state.level;
    let submitDescription = this.state.description;
    let submitHourPay = this.state.hourPay;
    let submitHourWork = this.state.hourWork;

    let cityIndex = parseInt(this.state.locations[0].split('-')[0]);
    let submitLocation = {
      city: this.props.locations[cityIndex].city,
      _id: this.props.locations[cityIndex]._id,
      district: []
    };
    for (let i = 0; i < this.state.locations.length; i++) {
      let districtIndex = parseInt(this.state.locations[i].split('-')[1]);
      submitLocation.district.push(
        this.props.locations[cityIndex].district[districtIndex]
      );
    }

    let token = 'Bearer ' + this.props.token;
    this.props.updateTeacherProfile(token, {
      submitSubjects,
      submitLevel,
      submitEducationLevel,
      submitDescription,
      submitLocation,
      submitHourPay,
      submitHourWork
    });
  };

  handleChangeEducationLevel = selectedOption => {
    this.setState({ selectedEducationLevel: selectedOption });
  };

  handleSubjectChange = selectedOption => {
    console.log(this.state.selectedSubject);

    this.setState({ selectedSubject: selectedOption });
  };

  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleLevelChange = e => {
    this.setState({
      level: e.target.value
    });
  };

  handleHourPay = e => {
    this.setState({
      hourPay: e.target.value
    });
  };

  handleHourWork = e => {
    this.setState({
      hourWork: e.target.value
    });
    if (e.target.value > 120) {
      message.error('Do you to die?', 1);
    } else if (e.target.value > 84) {
      message.warning('You have commited more than 12 hours a day', 1);
    }
  };

  handleLocationChange = value => {
    if (this.checkLocations(value)) {
      this.setState({ locations: value });
    }
  };

  checkLocations = locations => {
    if (locations.length === 0) return true;
    let index = parseInt(locations[0].split('-')[0]);
    for (let i = 0; i < locations.length; i++) {
      if (parseInt(locations[i].split('-')[0]) !== index) {
        message.error('You can choose only 1 city');
        return false;
      }
    }
    return true;
  };

  checkFields = () => {
    if (this.state.selectedSubject.length === 0) return false;
    if (this.state.selectedEducationLevel.length === 0) return false;
    if (this.state.level === null || this.state.locations === null)
      return false;
    if (this.state.description === '') return false;
    if (this.state.hourPay === 0) {
      return false;
    }
    if (this.state.hourWork === 0 || this.state.hourWork > 168) {
      return false;
    }
    return true;
  };

  render() {
    const { selectedSubject, selectedEducationLevel } = this.state;
    const { educationLevel, level, subjects, locations } = this.props;
    const successMessage = null;
    const errorMessage = null;

    return (
      <form className="tutorInfoForm" onSubmit={this.handleSubmit}>
        {successMessage}
        {errorMessage}
        <Spin tip="Loading..." spinning={this.props.pending}>
          <div className="shadow bg-white rounded px-3">
            <Container className="text-center pt-3">
              <h1>
                Apply to join <b>Tutor Recommendation</b>
              </h1>
              <p>
                Admission is competitve, as there are limited spaces for tutors
                on <b>Tutor Recommendation</b>
              </p>
            </Container>
            <Divider></Divider>
            <Container className="pb-3">
              <h4>Tell us about your services</h4>
              <Form.Group>
                <b>What is your major(Subject)?</b>
                <Select
                  isMulti
                  components={animatedComponents}
                  className="subjectSelect mt-1"
                  value={selectedSubject}
                  onChange={this.handleSubjectChange}
                  options={subjects}
                />
              </Form.Group>
              <Form.Group>
                <b>Which level do you want to teach?</b>
                <Select
                  isMulti
                  components={animatedComponents}
                  className="levelSelect mt-1"
                  value={selectedEducationLevel}
                  onChange={this.handleChangeEducationLevel}
                  options={educationLevel}
                />
              </Form.Group>
              <Form.Group>
                <b>Which level do you think you are?</b>
                <br />
                <Radio.Group
                  className="mt-1"
                  onChange={this.handleLevelChange}
                  value={this.state.level}
                >
                  {level.map(level => {
                    return (
                      <Radio
                        className="teachingLevel"
                        value={level.data}
                        key={level.value}
                        checked={this.props.teacher.experience.level && true}
                      >
                        {level.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Group>
              <Form.Group>
                <b>Where do you want to teach?</b>
                <br />
                <TreeSelect
                  className="teachingLocation mt-1"
                  showSearch
                  style={{ width: '100%' }}
                  value={this.state.locations}
                  dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  multiple
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  onChange={this.handleLocationChange}
                >
                  {locations.map((location, cityIndex) => {
                    return (
                      <TreeNode
                        value={location.city}
                        title={location.city}
                        key={location.city}
                        disabled
                      >
                        {location.district.map((district, districtIndex) => {
                          return (
                            <TreeNode
                              value={cityIndex + '-' + districtIndex}
                              title={district.name}
                              key={district._id}
                            />
                          );
                        })}
                      </TreeNode>
                    );
                  })}
                </TreeSelect>
              </Form.Group>
              <Form.Group>
                <b>How much do you want to be paid?</b>
                <br />
                <InputGroup className="mt-1 description">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="number"
                    value={this.state.hourPay}
                    onChange={event => this.handleHourPay(event)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>per hour</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <b>How long can you work?</b>
                <br />
                <InputGroup className="mt-1 description">
                  <FormControl
                    type="number"
                    value={this.state.hourWork}
                    onChange={event => this.handleHourWork(event)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">
                      per week
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <b>Describe about yourself</b>
                <Form.Control
                  className="mt-1 description"
                  as="textarea"
                  rows="7"
                  value={this.state.description}
                  onChange={event => this.handleDescription(event)}
                />
              </Form.Group>
              <Button onClick={() => this.handleSubmit()} variant="primary">
                Update teaching profile
              </Button>
            </Container>
          </div>
        </Spin>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  pending: state.teachingReducer.pending,
  teachingError: state.teachingReducer.error,
  subjects: state.teachingReducer.subjects,
  locations: state.teachingReducer.locations,
  educationLevel: state.teachingReducer.educationLevel,
  level: state.teachingReducer.level,
  token: state.authReducer.token,
  authMessage: state.authReducer.message,
  teachingMessage: state.teachingReducer.message,
  authError: state.authReducer.error,
  teacher: state.teachingReducer.teacher
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTeacherProfile,
      getSubjects,
      getEducationLevel,
      getLevel,
      getLocations,
      resetErrorMessage,
      getTeacher
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);
