import React from 'react';
// import { Dropdown, DropdownMenu } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classes from './NavigationItems.module.css';
import { getAuthToken, getAuthUser } from "../../../store/reducers/auth";

function NavigationItems(props) {
  const avatarDropdownStyle = {
    backgroundColor: "transparent",
    borderColor: "transparent",
  };

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
          <NavLink className="d-flex align-items-center" to="/settings" >
            <Icon className="mr-2" type="setting" />
            Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink className="d-flex align-items-center" to="/profile" >
            <Icon className="mr-2" type="profile" />
            Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink className="d-flex align-items-center" to="/teacher-profile" >
          <Icon className="mr-2" type="read" />
            Teacher Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink className="d-flex align-items-center" to="/logout" >
            <Icon className="mr-2" type="logout" /> Log out
          </NavLink>
        </Menu.Item>
      </Menu>)
  };

  return (
    <ul className={classes.NavigationItems} >
      <NavigationItem link="/">HOME</NavigationItem>
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
