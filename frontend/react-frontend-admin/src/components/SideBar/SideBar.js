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
            <Menu.Item key="7">
              <NavLink to="/levels">List Level</NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/levelEducations">List Level Education</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                Notification
              </span>
            }
          >
            <Menu.Item key="9">
              <NavLink to="/historyContract">History Contract</NavLink>
            </Menu.Item>
            <Menu.Item key="10">
              <NavLink to="/historyComplain">History Complain</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="area-chart" />
                Notification
              </span>
            }
          >
            <Menu.Item key="9">
              <NavLink to="/user">History User Contract</NavLink>
            </Menu.Item>
            <Menu.Item key="10">
              <NavLink to="/historyComplain">History Complain</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
export default SideBar;
