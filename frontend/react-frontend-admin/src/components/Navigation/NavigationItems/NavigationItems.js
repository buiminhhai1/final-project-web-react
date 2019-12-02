/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
  const username = localStorage.getItem('username');
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Trang chủ</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/game">Caro</NavigationItem> : null}
      {props.isAuthenticated
        ? (
          <NavigationItem link="/user/logout">
            <strong>
              {username}
              {' '}
            </strong>
Đăng xuất
          </NavigationItem>
        )
        : (<NavigationItem link="/user/login">Đăng nhập</NavigationItem>)}
      {!props.isAuthenticated ? <NavigationItem link="/user/register">Đăng kí</NavigationItem> : null}
    </ul>
  );
};


export default NavigationItems;
