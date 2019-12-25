import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import HeaderLayout from './components/HeaderLayout/HeaderLayout';
import BreadcrumbLayout from './components/BreadcrumbLayout/BreadcrumbLayout';
import SideBar from './components/SideBar/SideBar';
import * as actions from './store/actions/index';
import './App.css';

const asyncLogin = AsyncComponent(() => {
  return import('./containers/auth/Login/Login');
});

const asyncRegister = AsyncComponent(() => {
  return import('./containers/auth/Register/Register');
});

const asyncHomePage = AsyncComponent(() => {
  return import('./containers/HomePage/HomePage');
});

const asyncStudent = AsyncComponent(() => {
  return import('./containers/HomePage/HomePage');
});

const asyncTeacher = AsyncComponent(() => {
  return import('./containers/HomePage/HomePage');
});
const asyncLogout = AsyncComponent(() => {
  return import('./containers/auth/Logout/Logout');
});

const asyncSkill = AsyncComponent(() => {
  return import('./containers/Skill/Skill');
});

const asyncLocation = AsyncComponent(() => {
  return import('./containers/Location/Location');
});

const asyncLevel = AsyncComponent(() => {
  return import('./containers/Level/Level');
});

const asyncLevelEducation = AsyncComponent(() => {
  return import('./containers/LevelEducation/LevelEducation');
});

const asyncUserDetail = AsyncComponent(() => {
  return import('./containers/DetailUser/DetailUser');
});

const asyncContract = AsyncComponent(() => {
  return import('./containers/Contract/Contract');
});

const asyncComplain = AsyncComponent(() => {
  return import('./containers/Complain/Complain');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthLogin();
  }

  render() {
    const path = this.props.location.pathname;
    let routes = (
      <Switch>
        <Route path="/admin/login" component={asyncLogin} />
        <Route path="/admin/register" component={asyncRegister} />
        <Redirect to="/admin/login" />
      </Switch>
    );
    if (localStorage.getItem('token')) {
      routes = (
        <Switch>
          <Route path="/" exact component={asyncHomePage} />
          <Route path="/contract*" exact component={asyncContract} />
          <Route path="/complain*" exact component={asyncComplain} />
          <Route path="/skills*" component={asyncSkill} />
          <Route path="/students*" component={asyncStudent} />
          <Route path="/teachers*" component={asyncTeacher} />
          <Route path="/locations*" component={asyncLocation} />
          <Route path="/levels*" component={asyncLevel} />
          <Route path="/levelEducations*" component={asyncLevelEducation} />
          <Route path="/userdetail" component={asyncUserDetail} />
          <Route path="/admin/logout*" component={asyncLogout} />
          <Redirect to="/" />
        </Switch>
      );
    } // fix chỗ HeaderLayout
    const sideBar = this.props.isAuthenticated ? <SideBar /> : null;
    const breadcrumbLayout = this.props.isAuthenticated ? (
      <BreadcrumbLayout path={path} />
    ) : null;
    return (
      <div key={'Appjs'}>
        <Layout>
          <HeaderLayout isAuthenticated={this.props.isAuthenticated} />
          <Layout
            style={{
              background: 'white'
            }}
          >
            {sideBar}
            <Layout
              style={{
                padding: '24px'
              }}
            >
              {breadcrumbLayout} {routes}
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token != null,
  tabNum: state.auth.tabNum
});

const mapDispatchToProps = dispatch => ({
  onTryAuthLogin: () => dispatch(actions.authCheckState()),
  onSelectedTab: tabnum => dispatch(actions.selectedTab(tabnum))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
