import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import './App.css';

const asyncLogin = AsyncComponent(() => {
  return import('./containers/auth/login/Login');
});

const asyncRegister = AsyncComponent(() => {
  return import('./containers/auth/Register/Register');
});

const asyncHomePage = AsyncComponent(() => {
  return import('./containers/HomePage/HomePage');
});
function App() {
  const routes = (
    <Switch>
      <Route path="/admin/login" component={asyncLogin} />
      <Route path="/admin/register" component={asyncRegister} />
      <Route path="/" component={asyncHomePage} />
      <Redirect to="/" />
    </Switch>
  );
  return <div className="App">{routes}</div>;
}

export default App;
