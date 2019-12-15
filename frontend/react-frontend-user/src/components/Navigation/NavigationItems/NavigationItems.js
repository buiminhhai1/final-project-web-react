import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
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

    return (
        <ul className={classes.NavigationItems} >
            <NavigationItem link="/">HOME</NavigationItem>
            {props.token ?
                <Dropdown>
                    <Dropdown.Toggle
                        className={classes.avatarDropdown}
                        style={avatarDropdownStyle}
                        drop="left">
                        <Avatar src={props.user.imageUrl} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled>
                            <i style={{ fontSize: 13 }}>Signed in as</i>
                            <br />
                            <b>{props.user.name}</b>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <NavLink to="/settings" > Settings</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/profile" > Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/teacher-profile" > Teacher Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/logout" > Log out</NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
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
