import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Collapse, Icon, TreeSelect, message, Spin } from 'antd';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
  getLevel,
  getEducationLevel,
  getSubjects,
  getLocations
} from '../../store/actions/teaching';
import { resetErrorMessage } from '../../store/actions/auth';
import './filter.css';

const { Panel } = Collapse;
const animatedComponents = makeAnimated();
const { TreeNode } = TreeSelect;

class filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: [],
      selectedEducationLevel: [],
      selectedLevel: [],
      locations: null,
      hourPay: 0,
      hourWork: 0
    };
  }

  componentDidMount = () => {
    this.props.getSubjects();
    this.props.getEducationLevel();
    this.props.getLevel();
    this.props.getLocations();
  };

  handleChangeEducationLevel = selectedOption => {
    this.setState({ selectedEducationLevel: selectedOption });
  };

  handleSubjectChange = selectedOption => {
    this.setState({ selectedSubject: selectedOption });
  };

  handleLevelChange = selectedOption => {
    this.setState({ selectedLevel: selectedOption });
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
    // if (locations.length === 0) return true;
    // let index = parseInt(locations[0].split('-')[0]);
    // for (let i = 0; i < locations.length; i++) {
    //   if (parseInt(locations[i].split('-')[0]) !== index) {
    //     message.error('You can choose only 1 city');
    //     return false;
    //   }
    // }
    return true;
  };

  render() {
    const {
      selectedSubject,
      selectedEducationLevel,
      selectedLevel
    } = this.state;
    const { educationLevel, level, subjects, locations } = this.props;

    return (
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <Icon
            className="filter mr-2"
            type="filter"
            theme="filled"
            rotate={isActive ? 45 : 0}
          />
        )}
      >
        <Panel header="" key="1">
          <Spin tip="Loading..." spinning={this.props.pending}>
            <div className="px-3">
              <Container className="pb-3">
                <Row className="mb-3">
                  <Col md>
                    <b>Subjects</b>
                    <Select
                      isMulti
                      components={animatedComponents}
                      className="subjectSelect mt-1"
                      value={selectedSubject}
                      onChange={this.handleSubjectChange}
                      options={subjects}
                    />
                  </Col>
                  <Col md>
                    <b>Education level</b>
                    <Select
                      isMulti
                      components={animatedComponents}
                      className="levelSelect mt-1"
                      value={selectedEducationLevel}
                      onChange={this.handleChangeEducationLevel}
                      options={educationLevel}
                    />
                  </Col>
                  <Col md>
                    <b>Teacher's level</b>
                    <Select
                      isMulti
                      components={animatedComponents}
                      className="levelSelect mt-1"
                      value={selectedLevel}
                      onChange={this.handleLevelChange}
                      options={level}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md>
                    <b>Locations</b>
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
                            {location.district.map(
                              (district, districtIndex) => {
                                return (
                                  <TreeNode
                                    value={cityIndex + '-' + districtIndex}
                                    title={district.name}
                                    key={district._id}
                                  />
                                );
                              }
                            )}
                          </TreeNode>
                        );
                      })}
                    </TreeSelect>
                  </Col>
                  <Col md>
                    <b>Budget</b>
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
                    </InputGroup>
                  </Col>
                  <Col md>
                    <b>Teaching time</b>
                    <br />
                    <InputGroup className="mt-1 description">
                      <FormControl
                        type="number"
                        value={this.state.hourWork}
                        onChange={event => this.handleHourWork(event)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </div>
          </Spin>
        </Panel>
      </Collapse>
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
      getSubjects,
      getEducationLevel,
      getLevel,
      getLocations,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(filter);
