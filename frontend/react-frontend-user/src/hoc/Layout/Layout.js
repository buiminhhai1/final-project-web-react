import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auxiliary from '../Auxiliary/Auxiliary';

class Layout extends Component {
 constructor(props) {
  super(props);
  this.state = {
   showSideDrawer: false
  };
 }

 sideDrawerCloseHandler = () => {
  this.setState({
   showSideDrawer: false
  });
 };

 render() {
  return (
   <Auxiliary>
    <Toolbar
     isAuth={this.props.isAuthenticated}
     drawerToggleClicked={this.sideDrawerToggleHandler}
    />
    <SideDrawer
     isAuth={this.props.isAuthenticated}
     open={this.state.showSideDrawer}
     closed={this.sideDrawerToggleHandler}
    />
    <main className={classes.Content}>{this.props.children}</main>
   </Auxiliary>
  );
 }
}

export default Layout;
