import React from 'react';
<<<<<<< HEAD
import './App.css';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems'
=======
import { Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import './App.css';
import HeaderLayout from './components/HeaderLayout/HeaderLayout';
const asyncLogin = AsyncComponent(() => {
  return import('./containers/auth/Login/Login');
});
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962

const asyncRegister = AsyncComponent(() => {
  return import('./containers/auth/Register/Register');
});

const asyncHomePage = AsyncComponent(() => {
  return import('./containers/HomePage/HomePage');
});

function App() {
  const routes = (
    <Switch>
      <Route path="/admin/login" component={asyncLogin} />{' '}
      <Route path="/admin/register" component={asyncRegister} />{' '}
      <Route path="/" component={asyncHomePage} /> <Redirect to="/" />
    </Switch>
  );
  return (
<<<<<<< HEAD
    <div className="App">
      <NavigationItems/>
    </div>
=======
    <Layout>
      <HeaderLayout /> {routes}{' '}
    </Layout>
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962
  );
}

export default App;
