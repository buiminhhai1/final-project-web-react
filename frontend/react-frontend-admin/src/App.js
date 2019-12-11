import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import HeaderLayout from './components/HeaderLayout/HeaderLayout';
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

const asyncLogout = AsyncComponent(() => {
  return import('./containers/auth/Logout/Logout');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/admin/login" component={asyncLogin} />
        <Route path="/admin/register" component={asyncRegister} />
        <Redirect to="/admin/login" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={asyncHomePage} />
          <Route path="/admin/logout" component={asyncLogout} />
          <Redirect to="/" />
        </Switch>
      );
    } // fix chỗ HeaderLayout
    return (
      <div>
        <Layout>
          <HeaderLayout isAuthenticated={this.props.isAuthenticated} />
          {routes}
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
