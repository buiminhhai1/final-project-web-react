import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './HeaderLayout.css';
import UserInfo from '../UI/UserInfo/UserInfo';

const { Header } = Layout;

class HeaderLayout extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    let menuH = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[this.props.tabNum]}
        style={{
          lineHeight: '64px',
          textAlign: 'right'
        }}
      >
        <Menu.Item key="1">
          <NavLink to="/admin/login"> Login </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/admin/register"> Register </NavLink>
        </Menu.Item>
      </Menu>
    );
    if (this.props.isAuthenticated) {
      menuH = (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.props.tabNum]}
          style={{
            lineHeight: '64px',
            textAlign: 'right'
          }}
        >
          <Menu.Item key="1">
            <NavLink to="/"> HomePage </NavLink>
          </Menu.Item>
          <Menu.Item key="2" style={{ background: '#001529' }}>
            <UserInfo name={this.props.name} picture={this.props.picture} />
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
  }
}
const mapStateToProps = state => ({
  tabNum: state.auth.tabNum,
  name: state.auth.name,
  picture: state.auth.picture
});
export default connect(mapStateToProps)(HeaderLayout);
