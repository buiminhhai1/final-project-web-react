import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuthenticated 
            ? <NavigationItem link="/logout">Log out</NavigationItem>    
            : <NavigationItem link="/signIn">Sign In</NavigationItem>
        }
    </ul>
);
    

export default NavigationItems;