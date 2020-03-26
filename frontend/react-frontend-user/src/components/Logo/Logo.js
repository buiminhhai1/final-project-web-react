import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.css';
import workLogo from '../../assets/Images/logo.jpg';

function Logo(props) {
  return (
    <NavLink to="/" className={classes.Logo}>
      <img src={workLogo} alt="LOGO" />
    </NavLink>
  )
};

export default Logo;
