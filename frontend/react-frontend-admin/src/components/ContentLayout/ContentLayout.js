import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
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
