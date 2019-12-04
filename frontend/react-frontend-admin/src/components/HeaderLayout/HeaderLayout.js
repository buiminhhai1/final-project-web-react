import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './HeaderLayout.css';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

class HeaderLayout extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', textAlign: 'right' }}
        >
          <Menu.Item key="1">
            <NavLink to="/">HomePage</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/admin/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/admin/register">Register</NavLink>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
export default HeaderLayout;
