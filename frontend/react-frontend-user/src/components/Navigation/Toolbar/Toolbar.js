import React from 'react';
import classes from './Toolbar.module.css';
import './alter.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawToggle';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="d-flex align-items-center" style={{ maxHeight: '100%' }}>
      <div className={classes.Logo}>
        <Logo height="45px" />
      </div>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;
