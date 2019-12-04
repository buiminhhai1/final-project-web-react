import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './HomePage.css';
import { Layout } from 'antd';
import SideBar from '../../components/SideBar/SideBar';
import BreadcrumbLayout from '../../components/BreadcrumbLayout/BreadcrumbLayout';
import ContentLayout from '../../components/ContentLayout/ContentLayout';

class HomePage extends Component {
  componentDidMount() {}

  render() {
    return (
      <Layout>
        <SideBar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <BreadcrumbLayout />
          <ContentLayout />
        </Layout>
      </Layout>
    );
  }
}

export default HomePage;
