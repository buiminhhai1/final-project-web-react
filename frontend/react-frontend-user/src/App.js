import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Layout from './hoc/Layout/Layout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent'
import { getAuthToken, getAuthUser } from "./store/reducers/auth";
import { reLogin } from './store/actions/auth'

const asyncHomepage = AsyncComponent(() => {
  return import('./containers/homepage/homepage');
})

const asyncSignIn = AsyncComponent(() => {
  return import('./containers/signInPage/signIn');
})

const asyncSignUp = AsyncComponent(() => {
  return import('./containers/signUpPage/signUp');
})

const asyncTeacherProfile = AsyncComponent(() => {
  return import('./containers/teacherInfoRegister/teacherInfoRegister');
})

const asyncLogOut = AsyncComponent(() => {
  return import('./containers/logOut/logOut');
})

const asyncUpdateProfie = AsyncComponent(() => {
  return import('./containers/updateProfile/updateProfile');
})

class App extends React.Component {
  componentDidMount() {
    this.props.reLogin();
  }
  
  render() {
    const routes = (
      <Switch>
        <Route exact path="/" component={asyncHomepage}></Route>
        <Route path="/signIn" component={asyncSignIn}></Route>
        <Route path="/signUp" component={asyncSignUp}></Route>
        <Route path="/logout" component={asyncLogOut}></Route>
        <Route path="/profile" component={asyncUpdateProfie}></Route>
        <Route path="/teacher-profile" component={asyncTeacherProfile}></Route>
      </Switch>
    )
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  reLogin
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
