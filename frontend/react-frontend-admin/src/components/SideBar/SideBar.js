import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import './SideBar.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideBar extends Component {
  render() {
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                User
              </span>
            }
          >
            <Menu.Item key="1">
              <NavLink to="/students">Students</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/teachers">Teachers</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="solution" />
                Skills Management
              </span>
            }
          >
            <Menu.Item key="5">
              <NavLink to="/skills">List Skills</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/locations">List Locations</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                subnav 3
              </span>
            }
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
export default SideBar;
