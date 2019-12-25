import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Collapse, Icon, TreeSelect, message, Spin, Input, Select } from 'antd';

import {
  getLevel,
  getEducationLevel,
  getSubjects,
  getLocations
} from '../../store/actions/teaching';
import { resetErrorMessage } from '../../store/actions/auth';
import './filter.css';

const { Panel } = Collapse;
const { TreeNode } = TreeSelect;
const InputGroup = Input.Group;

class filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: [],
      selectedEducationLevel: [],
      selectedLevel: [],
      locations: [],
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

  updateFilterData = () => {
    let city = '';
    let districts = [];
    if (this.state.locations.length > 0) {
      let cityIndex = parseInt(this.state.locations[0].split('-')[0]);
      city = this.props.locations[cityIndex].city;

      for (let i = 0; i < this.state.locations.length; i++) {
        let districtIndex = parseInt(this.state.locations[i].split('-')[1]);
        const districtName = this.props.locations[cityIndex].district[
          districtIndex
        ].name;
        districts.push(districtName);
      }
    }

    const data = {
      subjects: this.state.selectedSubject,
      levels: this.state.selectedLevel,
      educationLevel: this.state.selectedEducationLevel,
      hourPay: this.state.hourPay,
      hourWork: this.state.hourWork,
      city,
      districts
    };

    this.props.updateFilter(data);
  };

  handleChangeEducationLevel = async selectedOption => {
    await this.setState({ selectedEducationLevel: selectedOption });
    await this.updateFilterData();
  };

  handleSubjectChange = async selectedOption => {
    await this.setState({ selectedSubject: selectedOption });
    this.updateFilterData();
  };

  handleLevelChange = async selectedOption => {
    await this.setState({ selectedLevel: selectedOption });
    await this.updateFilterData();
  };

  handleHourPay = async e => {
    const { value } = e.target;
    await this.setState({
      hourPay: e.target.value * 1
    });
    await this.updateFilterData();
    if (value > 1000) {
      message.warning('You are crazy', 1);
    } else if (value > 300) {
      message.warning('Seriously, who are you finding', 1);
    } else if (value > 100) {
      message.warning('Are you a rich kid', 1);
    }
  };

  handleHourWork = async e => {
    const { value } = e.target;
    await this.setState({
      hourWork: e.target.value * 1
    });
    await this.updateFilterData();
    if (value > 120) {
      message.error('No teacher can do that. You know?', 1);
    } else if (value > 84) {
      message.warning('A little bit too much', 1);
    }
  };

  handleLocationChange = async value => {
    if (this.checkLocations(value)) {
      await this.setState({ locations: value });
      await this.updateFilterData();
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

  render() {
    const {
      selectedSubject,
      selectedEducationLevel,
      selectedLevel
    } = this.state;
    const { educationLevel, level, subjects, locations } = this.props;
    const filteredSubjects = subjects.filter(
      o => !selectedSubject.includes(o.label)
    );
    const filteredLevels = level.filter(o => !selectedLevel.includes(o.label));
    const filteredEducationLevels = educationLevel.filter(
      o => !selectedEducationLevel.includes(o.label)
    );

    return (
      <Collapse
        bordered={false}
        // activeKey="1"
        expandIcon={({ isActive }) => (
          <Icon
            className="filter mr-2 btn "
            type="filter"
            theme="filled"
            rotate={isActive ? 180 : 0}
          />
        )}
      >
        <Panel header="" key="1">
          <Spin tip="Loading..." spinning={this.props.pending}>
            <div className="shadow bg-white p-3">
              <Container className="pb-3">
                <Row className="mb-3">
                  <Col md>
                    <b>Subjects</b>
                    <br />
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={selectedSubject}
                      onChange={this.handleSubjectChange}
                      style={{ width: '100%' }}
                    >
                      {filteredSubjects.map(subject => (
                        <Select.Option key={subject} value={subject.label}>
                          {subject.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col md>
                    <b>Education level</b>
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={selectedEducationLevel}
                      onChange={this.handleChangeEducationLevel}
                      style={{ width: '100%' }}
                    >
                      {filteredEducationLevels.map(educationLevel => (
                        <Select.Option
                          key={educationLevel}
                          value={educationLevel.label}
                        >
                          {educationLevel.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col md>
                    <b>Lesson's level</b>
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={selectedLevel}
                      onChange={this.handleLevelChange}
                      style={{ width: '100%' }}
                    >
                      {filteredLevels.map(level => (
                        <Select.Option key={level} value={level.label}>
                          {level.label}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <b>Budget (Maximum per hour)</b>
                    <br />
                    <InputGroup compact className="mt-1 description">
                      <Input
                        style={{
                          width: '20%',
                          textAlign: 'center',
                          color: '#85bb65',
                          fontWeight: 'bold'
                        }}
                        defaultValue="$"
                        disabled
                      />
                      <Input
                        style={{ width: '80%' }}
                        type="number"
                        defaultValue="0"
                        onChange={e => this.handleHourPay(e)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md>
                    <b>Teaching time (Minimum per week) </b>
                    <br />
                    <InputGroup compact className="mt-1 description">
                      <Input
                        style={{ width: '65%' }}
                        type="number"
                        defaultValue="0"
                        onChange={e => this.handleHourWork(e)}
                      />
                      <Input
                        style={{
                          width: '35%',
                          textAlign: 'center',
                          color: '#000',
                          fontWeight: 'bold'
                        }}
                        defaultValue="hours"
                        disabled
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
