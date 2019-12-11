import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Layout from './hoc/Layout/Layout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent'

const asyncHomepage = AsyncComponent(() => {
  return import('./containers/homepage/homepage');
})

const asyncSignIn = AsyncComponent(() => {
  return import('./containers/signInPage/signIn');
})

const asyncSignUp = AsyncComponent(() => {
  return import('./containers/signUpPage/signUp');
})

const asyncTutorRegister = AsyncComponent(() => {
  return import('./containers/tutorInfoRegister/tutorInfoRegister');
})

const asyncLogOut = AsyncComponent(() => {
  return import('./containers/logOut/logOut');
})

const asyncUpdateProfie = AsyncComponent(() => {
  return import('./containers/updateProfile/updateProfile');
})

function App() {
  const routes = (
    <Switch>
      <Route exact path="/" component={asyncHomepage}></Route>
      <Route path="/signIn" component={asyncSignIn}></Route>
      <Route path="/signUp" component={asyncSignUp}></Route>
      <Route path="/logout" component={asyncLogOut}></Route>
      <Route path="/profile" component={asyncUpdateProfie}></Route>
      <Route path="/tutorRegister" component={asyncTutorRegister}></Route>
      {/* <Route path="/profile" component={Profile}></Route> */}
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

export default App;
