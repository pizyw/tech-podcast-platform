import React, { useState } from 'react';
import { 
  Layout, 
  Tabs, 
  List, 
  Card, 
  Tag, 
  Button, 
  Space, 
  Typography, 
  Avatar, 
  Dropdown, 
  Menu,
  Empty,
  Progress,
  Tooltip
} from 'antd';
import {
  HeartOutlined,
  PlayCircleOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  StarOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  FolderOutlined,
  UserOutlined
} from '@ant-design/icons';
import { usePlayer } from '../contexts/PlayerContext';
import './Favorites.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface FavoriteEpisode {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  duration: number;
  progress: number;
  coverImage: string;
  category: string[];
  addedDate: string;
  lastPlayed?: string;
}

// 模拟收藏数据
const favoriteEpisodes: FavoriteEpisode[] = [
  {
    id: '1',
    title: '人工智能的下一个十年：从深度学习到AGI',
    host: '张教授',
    hostAvatar: 'https://picsum.photos/50/50?random=1',
    duration: 3600,
    progress: 75,
    coverImage: 'https://picsum.photos/300/200?random=1',
    category: ['AI前沿', '深度学习'],
    addedDate: '2024-03-15',
    lastPlayed: '2024-03-16'
  },
  {
    id: '2',
    title: '量子计算机的商业应用展望',
    host: '王博士',
    hostAvatar: 'https://picsum.photos/50/50?random=2',
    duration: 2700,
    progress: 30,
    coverImage: 'https://picsum.photos/300/200?random=2',
    category: ['量子计算', '商业应用'],
    addedDate: '2024-03-14'
  },
  {
    id: '3',
    title: 'Web3生态系统的演进与机遇',
    host: '李工程师',
    hostAvatar: 'https://picsum.photos/50/50?random=3',
    duration: 3300,
    progress: 100,
    coverImage: 'https://picsum.photos/300/200?random=3',
    category: ['Web3', '区块链'],
    addedDate: '2024-03-13',
    lastPlayed: '2024-03-15'
  }
];

const Favorites: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const { playTrack } = usePlayer();

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const moreMenu = (episode: FavoriteEpisode) => (
    <Menu>
      <Menu.Item key="1" icon={<FolderOutlined />}>
        添加到播放列表
      </Menu.Item>
      <Menu.Item key="2" icon={<ShareAltOutlined />}>
        分享
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<DeleteOutlined />} danger>
        取消收藏
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="favorites-page">
      <div className="favorites-header">
        <Title level={2}>
          <HeartOutlined /> 我的收藏
        </Title>
        <Text type="secondary">管理你收藏的优质内容</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="favorites-tabs">
        <TabPane 
          tab={<span><StarOutlined />收藏节目</span>} 
          key="1"
        >
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={favoriteEpisodes}
            renderItem={episode => (
              <List.Item>
                <Card
                  hoverable
                  className="episode-card"
                  cover={
                    <div className="episode-cover">
                      <img alt={episode.title} src={episode.coverImage} />
                      <div className="episode-overlay">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<PlayCircleOutlined />}
                          size="large"
                          onClick={() => playTrack(episode as any)}
                        />
                      </div>
                      {episode.progress > 0 && (
                        <Progress
                          percent={episode.progress}
                          showInfo={false}
                          strokeColor="#1890ff"
                          className="progress-bar"
                        />
                      )}
                    </div>
                  }
                  actions={[
                    <Button type="text" icon={<PlayCircleOutlined />}>
                      播放
                    </Button>,
                    <Dropdown overlay={moreMenu(episode)} trigger={['click']}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  ]}
                >
                  <Card.Meta
                    title={
                      <Tooltip title={episode.title}>
                        <div className="episode-title">{episode.title}</div>
                      </Tooltip>
                    }
                    description={
                      <Space direction="vertical" size={8} className="episode-info">
                        <Space align="center">
                          <Avatar src={episode.hostAvatar} size="small" />
                          <Text>{episode.host}</Text>
                        </Space>
                        <Space split={<Text type="secondary">|</Text>}>
                          <Text type="secondary">
                            <ClockCircleOutlined /> {formatDuration(episode.duration)}
                          </Text>
                          {episode.lastPlayed && (
                            <Text type="secondary">
                              <HistoryOutlined /> {episode.lastPlayed}
                            </Text>
                          )}
                        </Space>
                        <div className="episode-tags">
                          {episode.category.map(cat => (
                            <Tag key={cat}>{cat}</Tag>
                          ))}
                        </div>
                      </Space>
                    }
                  />
                </Card>
              </List.Item>
            )}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="还没有收藏任何节目"
                >
                  <Button type="primary">去发现好内容</Button>
                </Empty>
              )
            }}
          />
        </TabPane>
        <TabPane 
          tab={<span><UserOutlined />关注主播</span>} 
          key="2"
        >
          {/* 关注主播内容将在后续实现 */}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Favorites;
