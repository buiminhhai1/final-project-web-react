import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
class BreadcrumbLayout extends Component {
  render() {
    return (
      <Breadcrumb
        style={{
          margin: '16px 0'
        }}
      >
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default BreadcrumbLayout;
