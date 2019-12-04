import React from 'react';
import classes from './Logo.module.css';
import workLogo from '../../assets/Images/logo.jpg';

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={workLogo} alt="MyBurger" />
  </div>
);

export default Logo;
