import React, { Component } from 'react'
import { Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './teacherInfoRegister.css'
import { updateTeacherProfile } from '../../store/actions/profile';
import { getSubjects, getLevel, changeLevelStatus } from '../../store/actions/teaching';
import { getTeachingSubjects, getTeachingLevel } from '../../store/reducers/teaching';

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: [],
      selectedLevel: [],
      teachingLevel: [true, false, false],
      description: ''
    }
  }

  componentDidMount = () => {
    this.props.getSubjects();
    this.props.getLevel();
  }

  handleSubmit = (event) => {
    let submitSubjects = [];
    this.state.selectedSubject.map(subject => {
      return submitSubjects.push(subject.data)
    })
    let submitLevel = [];
    this.state.selectedLevel.map(level => {
      return submitLevel.push(level.data)
    })
    let submitEducationLevel = this.state.teachingLevel.findIndex((element) => element === true);
    let submitDescription = this.state.description;

    console.log({ submitSubjects, submitLevel, submitEducationLevel, submitDescription });
    
    // this.props.updateTeacherProfile({ submitSubjects, submitLevel, submitEducationLevel, submitDescription });
  }

  handleChangeGradeLevel = selectedOption => {
    this.setState(
      { selectedLevel: selectedOption },
    );
  }

  handleSubjectChange = selectedOption => {
    this.setState(
      { selectedSubject: selectedOption },
    );
  };

  handleDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  handleLevelChange = (index) => {
    let levelArr = [false, false, false];
    levelArr[index] = true;
    this.setState({
      teachingLevel: levelArr
    });
  }

  render() {
    const { selectedSubject, selectedLevel } = this.state;
    const subjects = this.props.subjects;
    const levels = this.props.level;

    return (
      <form className="tutorInfoForm" onSubmit={this.handleSubmit}>
        <Card>
          <Card.Header className="text-center">
            <h1>Apply to join <b>Tutor Recommendation</b></h1>
            <p>Admission is competitve, as there are limited spaces for tutors on <b>Tutor Recommendation</b></p>
          </Card.Header>
          <Card.Body>

            <Card.Title>Tell us about your services</Card.Title>

            <Card.Text>
              <b>What is your major(Subject)?</b>
              <Select
                isMulti
                className="subjectSelect"
                value={selectedSubject}
                onChange={this.handleSubjectChange}
                options={subjects}
              />
            </Card.Text>

            <Card.Text>
              <b>Which level do you want to teach?</b>
              <Select
                isMulti
                className="levelSelect"
                value={selectedLevel}
                onChange={this.handleChangeGradeLevel}
                options={levels}
              />
            </Card.Text>

            <Card.Text>
              <b>Which level do you think you are?</b>
              <Form>
                {['Entry level', 'Intermidiate', 'Expert'].map((level, index) =>
                  <div key={`custom-radio-${level}`} className="mb-1">
                    <Form.Check
                      custom
                      type='radio'
                      id={`radio-${level}`}
                      label={`${level}`}
                      checked={this.state.teachingLevel[index]}
                      onClick={() => this.handleLevelChange(index)}
                    />
                  </div>
                )}
              </Form>
            </Card.Text>

            <Card.Text>
              <b>Describe about yourself</b>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows="7"
                  onChange={(event) => this.handleDescription(event)} />
              </Form.Group>
            </Card.Text>

          </Card.Body>
          <Card.Footer className="text-muted">
            <Button onClick={() => this.handleSubmit()} variant="primary">
              Update teaching profile
            </Button>
          </Card.Footer>
        </Card>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: getTeachingSubjects(state),
  level: getTeachingLevel(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTeacherProfile, getSubjects, getLevel, changeLevelStatus
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherProfile);