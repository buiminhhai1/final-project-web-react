import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthToken } from "../../../store/reducers/auth";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/contact">Contact</NavigationItem>
        {props.token ? <NavigationItem link="/settings">Settings</NavigationItem> : null}
        {props.token
            ? <NavigationItem link="/logout">Log out</NavigationItem>
            : <NavigationItem link="/signIn">Sign In</NavigationItem>
        }
    </ul>
);

const mapStateToProps = state => ({
    token: getAuthToken(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationItems);
