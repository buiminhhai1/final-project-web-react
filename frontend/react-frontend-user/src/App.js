import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Layout from './hoc/Layout/Layout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent'

const asyncSignIn = AsyncComponent(() => {
  return import('./containers/signInPage/signIn');
})

function App() {
  const routes = (
    <Switch>
      {/* <Route exact path="/" component={Home}></Route> */}
      <Route path="/signIn" component={asyncSignIn}></Route>
      <Route path="/signUp" component={asyncSignIn}></Route>
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
