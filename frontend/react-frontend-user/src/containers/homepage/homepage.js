import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';

import TeacherInfoCard from '../../components/TeacherInfoCard/TeacherInfoCard';
import { getTeachers } from '../../store/actions/teaching';
import './homepage.css';

const { TabPane } = Tabs;

class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 4
    }
  }

  componentDidMount() {
    this.props.getTeachers();
    this.resposiveItemPerPage();
    window.addEventListener('resize', () => this.resposiveItemPerPage());
  }

  resposiveItemPerPage() {
    if (window.innerWidth < 992) {
      this.setState({ itemsPerPage: 2 })
    }
    else
      if (window.innerWidth < 1200) {
        this.setState({ itemsPerPage: 3 })
      }
      else {
        this.setState({ itemsPerPage: 4 })
      }
  }

  render() {
    // Pagination
    let { itemsPerPage } = this.state;
    let pageNumber = Math.ceil(this.props.teachers.length / itemsPerPage);
    let pages = [];
    for (let i = 0; i < pageNumber; i++) {
      let page = [];
      for (let j = i * itemsPerPage; j < i * itemsPerPage + itemsPerPage && j < this.props.teachers.length; j++) {
        page.push(this.props.teachers[j]);
      }
      pages.push(page);
    }
    return (
      <div className="container">
        <Tabs tabPosition="bottom">
          {pages.map((page, index) => {
            return (
              <TabPane tab={index + 1} key={index}>
                <Container className="d-flex justify-content-center">
                  {page.map(teacher => {
                    return (
                      <TeacherInfoCard
                        key={teacher.email}
                        loading={this.props.pending}
                        imageUrl={teacher.imageUrl}
                        name={teacher.name}
                        userId={teacher._id} />
                    )
                  })}
                </Container>
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.teachingReducer.error,
  pending: state.teachingReducer.pending,
  teachers: state.teachingReducer.teachers,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getTeachers
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homepage);