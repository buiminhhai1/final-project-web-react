import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './Logo.module.css';
import workLogo from '../../assets/Images/logo.jpg';

function Logo(props) {
  const [redirect, setRedirect] = useState(false);
  return (
    redirect === true ?
      (<div className={classes.Logo}
        style={{ height: props.height }}
        onClick={() => setRedirect(true)}>
        <Redirect to="/" />
        <img src={workLogo} alt="LOGO" />
      </div>
      )
      :
      (
        <div className={classes.Logo}
          style={{ height: props.height }}
          onClick={() => setRedirect(true)}>
          <img src={workLogo} alt="LOGO" />
        </div>
      )
  )
};

export default Logo;
