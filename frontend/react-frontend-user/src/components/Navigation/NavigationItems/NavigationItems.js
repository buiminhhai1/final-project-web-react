import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classes from './NavigationItems.module.css';
import { getAuthToken, getAuthUser } from "../../../store/reducers/auth";

function NavigationItems(props) {
  const menu = () => {
    return (
      props.token &&
      <Menu>
        <Menu.Item disabled>
          <i style={{ fontSize: 13 }}>Signed in as</i>
          <br />
          <b>{props.user.name}</b>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-primary" to="/settings" >
            <Icon className="mr-2" type="setting" />
            Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-primary" to="/profile" >
            <Icon className="mr-2" type="profile" />
            Profile
          </NavLink>
        </Menu.Item>
        {localStorage.getItem('method') === 'local' && (
          <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-warning" to="/changePassword" >
            <Icon className="mr-2" type="key" />
            Change password
          </NavLink>
        </Menu.Item>
        )}
        <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-success" to="/teacher-profile" >
          <Icon className="mr-2" type="read" />
            Teacher Profile
          </NavLink>
        </Menu.Item>
        {(props.user.isTeacher === 'true' || props.user.isTeacher === true) && (
          <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-info" to="/contractHistory" >
          <Icon className="mr-2" type="file-protect" />
            Contracts
          </NavLink>
        </Menu.Item>
        )}
        <Menu.Item>
          <NavLink className="d-flex align-items-center btn-outline-danger" to="/logout" >
            <Icon className="mr-2" type="logout" /> Log out
          </NavLink>
        </Menu.Item>
      </Menu>)
  };

  return (
    <ul className={classes.NavigationItems} >
      <NavigationItem link="/">HOME</NavigationItem>
      {props.token ?
        <NavigationItem link="/chat">CHAT</NavigationItem>
        : null}
      {props.token ?
        <Dropdown overlay={menu} className="mx-4">
          <Avatar src={props.user.imageUrl} />
        </Dropdown>
        : null}
      {
        props.token
          ? null
          : <NavigationItem link="/signIn">Sign In</NavigationItem>
      }
    </ul >
  );
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationItems);
