import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';

class BreadcrumbLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { path: '' };
  }

  render() {
    let pathArr = this.props.path ? this.props.path.split('/') : null;
    let countEmpty = 0;
    pathArr.forEach(temp => {
      if (temp === '') {
        countEmpty++;
      }
    });
    if (countEmpty === 2) {
      pathArr = [''];
    }
    let items = null;
    if (pathArr) {
      if (pathArr.length > 0) {
        items = pathArr.map(value => {
          if (value === '') {
            return (
              <Breadcrumb.Item key={value}>
                <NavLink to={`/`}>{'home'.toUpperCase()}</NavLink>
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item key={value}>
              <NavLink to={`/${value}`}>{value.toUpperCase()}</NavLink>
            </Breadcrumb.Item>
          );
        });
      } else {
        items = (
          <Breadcrumb.Item>
            <NavLink to={`/`}>{'home'.toUpperCase()}</NavLink>
          </Breadcrumb.Item>
        );
      }
    }

    return (
      <Breadcrumb
        style={{
          margin: '16px 0'
        }}
      >
        {items}
      </Breadcrumb>
    );
  }
}

export default BreadcrumbLayout;
