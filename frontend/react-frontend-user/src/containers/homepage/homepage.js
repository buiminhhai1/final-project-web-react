import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Spin } from 'antd';
import { Container, Carousel } from 'react-bootstrap';

import TeacherInfoCard from '../../components/TeacherInfoCard/TeacherInfoCard';
import Filter from '../filter/filter';
import { getTeachers } from '../../store/actions/teaching';
import './homepage.css';
import Banner1 from "../../assets/Images/winter_banner.png";
import Banner2 from "../../assets/Images/christmas_banner.png";
import Banner3 from "../../assets/Images/christmas_banner_1.png";

const { TabPane } = Tabs;

// searchValueInObject()

// checkValueInArray = (value, array) => {
//   for(let i = 0; i < array.length; i++){
//     if(value === array)
//   }
// };

class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 4,
      filterSubjects: [],
      filterLevels: [],
      filterEducationLevels: [],
      filterHourPay: 0,
      filterHourWork: 0,
      filterCity: '',
      filterDistrict: []
    };
  }

  componentDidMount() {
    this.props.getTeachers();
    this.resposiveItemPerPage();
    window.addEventListener('resize', () => this.resposiveItemPerPage());
  }

  resposiveItemPerPage() {
    if (window.innerWidth < 992) {
      this.setState({ itemsPerPage: 2 });
    } else if (window.innerWidth < 1200) {
      this.setState({ itemsPerPage: 3 });
    } else {
      this.setState({ itemsPerPage: 4 });
    }
  }

  filterteacher(data) {
    const filterSubjects = data.subjects;
    const filterLevels = data.levels;
    const filterEducationLevels = data.educationLevel;
    const filterHourPay = data.hourPay;
    const filterHourWork = data.hourWork;
    const filterCity = data.city;
    const filterDistrict = data.districts;

    this.setState({
      filterSubjects,
      filterLevels,
      filterEducationLevels,
      filterHourPay,
      filterCity,
      filterHourWork,
      filterDistrict
    });
  }

  addSubjectFilter(data) {
    if (!this.state.filterSubjects.includes(data)) {
      let newFilterSubjects = this.state.filterSubjects;
      newFilterSubjects.push(data);
      this.setState({ filterSubjects: newFilterSubjects });
    }
  }

  filterAndSortTeacher(teachers) {
    const { filterSubjects, filterLevels, filterEducationLevels,
      filterHourPay, filterCity, filterHourWork, filterDistrict } = this.state;

    // SUBJECTS
    teachers = teachers.filter(teacher => {
      if (filterSubjects.length === 0) return true;
      let subjects = teacher.experience.skill;
      for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < filterSubjects.length; j++) {
          if (subjects[i].title === filterSubjects[j]) return true;
        }
      }
      return false;
    });

    // LEVELS
    teachers = teachers.filter(teacher => {
      if (filterLevels.length === 0) return true;
      let level = teacher.experience.level;
      for (let j = 0; j < filterLevels.length; j++) {
        if (level.title === filterLevels[j]) return true;
      }
      return false;
    });

    // EDUCATION LEVELS
    teachers = teachers.filter(teacher => {
      if (filterEducationLevels.length === 0) return true;
      let educationLevels = teacher.experience.educationLevel;
      for (let i = 0; i < educationLevels.length; i++) {
        for (let j = 0; j < filterEducationLevels.length; j++) {
          if (educationLevels[i].title === filterEducationLevels[j])
            return true;
        }
      }
      return false;
    });

    // LOCATION
    teachers = teachers.filter(teacher => {
      if (filterCity === '') return true;
      if (teacher.experience.location.city === filterCity) {
        if (filterDistrict.length === 0) return true;
        let districts = teacher.experience.location.district;
        for (let i = 0; i < districts.length; i++) {
          for (let j = 0; j < filterDistrict.length; j++) {
            if (districts[i].name === filterDistrict[j]) return true;
          }
        }
      }
      return false;
    });

    // BUDGET
    teachers = teachers.filter(teacher => {
      if (filterHourPay === 0) return true;
      if (filterHourPay >= teacher.status.hourRate) return true;
      return false;
    });

    // COMMIT TIME
    teachers = teachers.filter(teacher => {
      if (filterHourWork === 0) return true;
      if (filterHourWork <= teacher.status.timeCommit) return true;
      return false;
    });

    // SORT TOP RATING TEACHER
    teachers = teachers.sort((teacher1, teacher2) => teacher2.totalScore - teacher1.totalScore);

    return teachers;
  }

  render() {
    const { itemsPerPage } = this.state;
    let { teachers } = this.props;
    teachers = this.filterAndSortTeacher(teachers);

    // PAGINATION
    let pageNumber = Math.ceil(teachers.length / itemsPerPage);
    let pages = [];
    for (let i = 0; i < pageNumber; i++) {
      let page = [];
      for (
        let j = i * itemsPerPage;
        j < i * itemsPerPage + itemsPerPage && j < teachers.length;
        j++
      ) {
        page.push(teachers[j]);
      }
      pages.push(page);
    }
    return (
      <div>
        {!this.props.token &&
          <Container className="d-flex justify-content-center">
            <Carousel className="my-3 d-flex justify-content-center banner">
              <Carousel.Item onClick={() => window.location.replace('http://localhost:3000/signUp')}>
                <img className="banner" src={Banner1} alt="Banner not found" />
              </Carousel.Item>
              <Carousel.Item onClick={() => window.location.replace('http://localhost:3000/signUp')}>
                <img className="banner" src={Banner2} alt="Banner not found" />
              </Carousel.Item>
              <Carousel.Item onClick={() => window.location.replace('http://localhost:3000/signUp')}>
                <img className="banner" src={Banner3} alt="Banner not found" />
              </Carousel.Item>
            </Carousel>
          </Container>
        }
        <Container className="teacher-list">
          <Filter updateFilter={data => this.filterteacher(data)} />
          <Spin tip="Loading..." spinning={this.props.pending}>
            <Tabs style={{ minHeight: 300, textAlign: 'center' }} tabPosition="bottom">
              {pages.map((page, index) => {
                return (
                  <TabPane tab={index + 1} key={index}>
                    <Container className="d-flex justify-content-center mt-3">
                      {page.map(teacher => {
                        return (
                          <TeacherInfoCard
                            key={teacher.email}
                            loading={this.props.pending}
                            imageUrl={teacher.imageUrl}
                            name={teacher.name}
                            city={teacher.experience.location.city}
                            subjects={teacher.experience.skill}
                            userId={teacher._id}
                            hourWork={teacher.status.timeCommit}
                            hourPay={teacher.status.hourRate}
                          // subjectSearch={data => this.addSubjectFilter(data)}
                          />
                        );
                      })}
                    </Container>
                  </TabPane>
                );
              })}
            </Tabs>
          </Spin>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.teachingReducer.error,
  pending: state.teachingReducer.pending,
  teachers: state.teachingReducer.teachers,
  token: state.authReducer.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTeachers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(homepage);
