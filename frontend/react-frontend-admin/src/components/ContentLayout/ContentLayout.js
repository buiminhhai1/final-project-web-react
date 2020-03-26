import React, { Component } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;

class ContentLayout extends Component {
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

export default ContentLayout;
