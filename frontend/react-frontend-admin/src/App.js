import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import HeaderLayout from './components/HeaderLayout/HeaderLayout';
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

function App() {
  const routes = (
    <Switch>
      <Route path="/admin/login" component={asyncLogin} />
      <Route path="/admin/register" component={asyncRegister} />
      <Route path="/" component={asyncHomePage} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Layout>
      <HeaderLayout />
      {routes}
    </Layout>
  );
}

export default App;
