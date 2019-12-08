import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './HeaderLayout.css';

const { Header } = Layout;

const HeaderLayout = props => {
  let menuH = (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[props.tabNum + '']}
      style={{
        lineHeight: '64px',
        textAlign: 'right'
      }}
    >
      <Menu.Item key="2">
        <NavLink to="/admin/login"> Login </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/admin/register"> Register </NavLink>
      </Menu.Item>
    </Menu>
  );
  if (props.isAuthenticated) {
    menuH = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[props.tabNum]}
        style={{
          lineHeight: '64px',
          textAlign: 'right'
        }}
      >
        <Menu.Item key="1">
          <NavLink to="/"> HomePage </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/admin/logout"> Logout </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Header className="header">
      <div className="logo" />
      {menuH}
    </Header>
  );
};
const mapStateToProps = state => ({
  tabNum: state.auth.tabNum
});
export default connect(mapStateToProps)(HeaderLayout);
