import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Avatar, Badge, Dropdown, Space, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  CompassOutlined,
  RiseOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './MainHeader.css';

const { Header } = Layout;
const { Search } = Input;

const MainHeader: React.FC = () => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">个人主页</Link>
      </Menu.Item>
      <Menu.Item key="subscriptions">
        <Link to="/subscriptions">我的订阅</Link>
      </Menu.Item>
      <Menu.Item key="favorites">
        <Link to="/favorites">收藏列表</Link>
      </Menu.Item>
      <Menu.Item key="history">
        <Link to="/history">收听历史</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="settings">
        <Link to="/settings">设置</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        退出登录
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu>
      <Menu.Item key="notification-1">
        <Badge status="processing" text="新一期《AI前沿观察》已更新" />
      </Menu.Item>
      <Menu.Item key="notification-2">
        <Badge status="default" text="您订阅的主播发布了新内容" />
      </Menu.Item>
      <Menu.Item key="notification-3">
        <Badge status="default" text="新的播客推荐" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="all-notifications">
        <Link to="/notifications">查看全部通知</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="main-header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="科技播客" />
            <Typography.Title level={4} style={{ margin: 0, color: '#fff' }}>
              科技播客
            </Typography.Title>
          </Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="main-menu"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/discover" icon={<CompassOutlined />}>
            <Link to="/discover">发现</Link>
          </Menu.Item>
          <Menu.Item key="/trending" icon={<RiseOutlined />}>
            <Link to="/trending">热门</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className="header-right">
        <Space size="large">
          {searchVisible ? (
            <Search
              placeholder="搜索播客、主播或关键词"
              style={{ width: 300 }}
              onBlur={() => setSearchVisible(false)}
              autoFocus
            />
          ) : (
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={() => setSearchVisible(true)}
              className="search-button"
            />
          )}
          
          <Dropdown overlay={notificationMenu} trigger={['click']}>
            <Badge count={3}>
              <Button type="text" icon={<BellOutlined />} className="notification-button" />
            </Badge>
          </Dropdown>

          <Dropdown overlay={userMenu} trigger={['click']}>
            <Space className="user-dropdown">
              <Avatar icon={<UserOutlined />} />
              <span className="username">用户名</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default MainHeader;
