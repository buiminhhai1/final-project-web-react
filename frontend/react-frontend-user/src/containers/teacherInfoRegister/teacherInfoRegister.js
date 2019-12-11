import React, { Component } from 'react'
import { Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './teacherInfoRegister.css'
import { updateTeacherProfile } from '../../store/actions/profile';

var gradeLevel = [];
for (let i = 1; i <= 12; i++) {
  gradeLevel.push({
    value: i,
    isChecked: false
  });
}
gradeLevel.push({
  value: `Over 12`,
  isChecked: false
});

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
        { value: 'Math', label: 'Math' },
        { value: 'Literature', label: 'Literature' },
        { value: 'Physics', label: 'Physics' },
        { value: 'Chemistry', label: 'Chemistry' },
        { value: 'English', label: 'English' },
      ],
      selectedSubject: [],
      level: [true, false, false],
      gradeLevel,
      description: ''
    }
  }

  handleSubmit = (event) => {
    let submitSubjects = [];
    this.state.selectedSubject.map(subject => {
      submitSubjects.push(subject.value)
    })
    let submitGrades = [];
    this.state.gradeLevel.map(grade => {
      if (grade.isChecked)
        submitGrades.push(grade.value)
    })
    let submitLevel = this.state.level.findIndex((element) => element === true);
    let submitDescription = this.state.description;

    this.props.updateTeacherProfile({ submitSubjects, submitGrades, submitLevel, submitDescription });
  }

  handleChangeGradeLevel = index => {
    // console.log(index);
    let newGradeLevel = this.state.gradeLevel;
    newGradeLevel[index].isChecked = !newGradeLevel[index].isChecked;
    this.setState({
      gradeLevel: newGradeLevel
    })
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
      level: levelArr
    });
  }

  render() {
    const { selectedSubject, subjects } = this.state;

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
              <b>Which grade do you prefer?</b>
              <Form>
                {this.state.gradeLevel.map((grade, index) => (
                  <div key={`custom-checkbox-${grade.value}`} className="mb-1">
                    <Form.Check
                      custom
                      type='checkbox'
                      id={`custom-checkbox-${grade.value}`}
                      label={`${grade.value}`}
                      onClick={() => this.handleChangeGradeLevel(index)}
                    />
                  </div>
                ))}
              </Form>
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
                      checked={this.state.level[index]}
                      onClick={() => this.handleLevelChange(index)}
                    />
                  </div>
                )}
              </Form>
            </Card.Text>

            <Card.Text>
              <b>Describe about yourself</b>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
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

})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTeacherProfile
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherProfile);