import React from 'react';
import { Layout } from 'antd';
import MainHeader from './MainHeader';
import './MainLayout.css';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout">
      <MainHeader />
      <Content className="main-content">
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
