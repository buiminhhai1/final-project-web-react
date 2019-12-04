import React, { Component } from 'react'
import { Card, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import './tutorInfoRegister.css'

export default class tutorInfoRegister extends Component {
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
      selectedSubject: null,
      level: [true, false, false]
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleSubjectChange = selectedOption => {
    this.setState(
      { selectedOption },
    );
  };

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
                className="subjectSelect"
                value={selectedSubject}
                onChange={this.handleSubjectChange}
                options={subjects}
              />
            </Card.Text>

            <Card.Text>
              <b>Which grade do you prefer?</b>
              <Form>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'Over 12'].map(grade => (
                  <div key={`custom-checkbox-${grade}`} className="mb-1">
                    <Form.Check
                      custom
                      type='checkbox'
                      id={`checkbox-${grade}`}
                      label={`${grade}`}
                    />
                  </div>
                ))}
              </Form>
            </Card.Text>

            <Card.Text>
              <b>Which grade do you prefer?</b>
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

          </Card.Body>
          <Card.Footer className="text-muted">
            <Button variant="primary">Go somewhere</Button>
          </Card.Footer>
        </Card>
      </form>
    )
  }
}
