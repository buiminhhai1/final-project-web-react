import React, { Component } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './HomePage.css';

const { Content } = Layout;

class HomePage extends Component {
  render() {
    return (
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 800
        }}
      >
        Content
      </Content>
    );
  }
}

export default HomePage;
