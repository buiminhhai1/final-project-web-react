import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
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

const asyncUpdateProfile = AsyncComponent(() => {
  return import('./containers/updateProfile/updateProfile');
})

const asyncUserProfile = AsyncComponent(() => {
  return import('./containers/userProfile/userProfile');
})

class App extends React.Component {
  componentDidMount() {
    this.props.reLogin();
  }

  render() {
    function NoMatch(props) {
      if (!props.user)
        return (
          <Redirect to='/signIn' />
        );
      else {
        return (
          <Redirect to='/' />
        );
      }
    }

    const routes = (
      this.props.user === null ?
        <Switch>
          <Route exact path="/" component={asyncHomepage}></Route>
          <Route path="/signIn" component={asyncSignIn}></Route>
          <Route path="/signUp" component={asyncSignUp}></Route>
          <Route path="/user-profile" component={asyncUserProfile}></Route>
          <Route path="*">
            <NoMatch user={this.props.user} />
          </Route>
        </Switch>
        :
        <Switch>
          <Route exact path="/" component={asyncHomepage}></Route>
          <Route path="/logout" component={asyncLogOut}></Route>
          <Route path="/profile" component={asyncUpdateProfile}></Route>
          <Route path="/user-profile" component={asyncUserProfile}></Route>
          <Route path="/teacher-profile" component={asyncTeacherProfile}></Route>
          <Route path="*">
            <NoMatch user={this.props.user} />
          </Route>
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
