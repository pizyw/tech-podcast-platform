import React, { useState } from 'react';
import { Card, List, Typography, Tag, Space, Button, Tabs, Statistic, Row, Col, Avatar, Tooltip } from 'antd';
import {
  PlayCircleOutlined,
  PlusOutlined,
  FireOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { usePlayer } from '../../contexts/PlayerContext';
import { AudioTrack } from '../../types/player.types';
import './AINewsDemo.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface PodcastData extends AudioTrack {
  description: string;
  category: string[];
  tags: string[];
  publishDate: string;
  listens: number;
  likes: number;
  comments: number;
}

// 模拟最新AI新闻播客数据
const aiNewsPodcasts: PodcastData[] = [
  {
    id: '1',
    title: 'GPT-5预测：多模态理解的突破',
    artist: 'AI前沿观察',
    description: '探讨GPT-5可能带来的革命性突破，包括更强大的多模态理解能力、更自然的人机交互，以及在科研领域的潜在应用。',
    category: ['AI模型', '深度学习'],
    tags: ['GPT-5', '多模态AI', '机器学习'],
    coverImage: 'https://picsum.photos/800/400?random=1',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    duration: 2520,
    publishDate: '2024-03-15',
    listens: 25890,
    likes: 1256,
    comments: 328
  },
  {
    id: '2',
    title: '开源AI的崛起：Llama 3模型解析',
    artist: '开源力量',
    description: '深入分析Meta最新发布的Llama 3模型，探讨其架构创新、性能提升，以及对AI民主化的影响。',
    category: ['开源AI', '模型架构'],
    tags: ['Llama 3', 'Meta', '开源模型'],
    coverImage: 'https://picsum.photos/800/400?random=2',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav',
    duration: 3150,
    publishDate: '2024-03-14',
    listens: 18670,
    likes: 892,
    comments: 245
  },
  {
    id: '3',
    title: 'AI芯片革命：新架构与量子计算',
    artist: '硅谷前沿',
    description: '探讨最新AI芯片架构的突破，以及量子计算在AI训练中的应用前景，包括能耗优化和算力提升。',
    category: ['AI硬件', '量子计算'],
    tags: ['AI芯片', '量子计算', '硬件创新'],
    coverImage: 'https://picsum.photos/800/400?random=3',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav',
    duration: 2840,
    publishDate: '2024-03-13',
    listens: 15420,
    likes: 763,
    comments: 186
  },
  {
    id: '4',
    title: 'AI安全与伦理：大模型监管新框架',
    artist: '科技与伦理',
    description: '讨论各国最新的AI监管政策，以及如何在促进创新与确保安全之间取得平衡。',
    category: ['AI伦理', '政策法规'],
    tags: ['AI监管', '伦理准则', '安全框架'],
    coverImage: 'https://picsum.photos/800/400?random=4',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    duration: 2960,
    publishDate: '2024-03-12',
    listens: 12890,
    likes: 645,
    comments: 234
  }
];

const AINewsDemo: React.FC = () => {
  const { playTrack, addToQueue } = usePlayer();
  const [activeTab, setActiveTab] = useState('1');

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number): string => {
    return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <div className="ai-news-container">
      <div className="header-section">
        <Title level={2}>AI科技新知</Title>
        <Text type="secondary">
          探索AI领域的最新突破与前沿动态，聆听行业专家的深度解析
        </Text>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="news-tabs">
        <TabPane tab={<span><FireOutlined />最热播报</span>} key="1">
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            dataSource={aiNewsPodcasts}
            renderItem={(podcast) => (
              <List.Item>
                <Card
                  hoverable
                  className="podcast-card"
                  cover={
                    <div className="cover-container">
                      <img alt={podcast.title} src={podcast.coverImage} />
                      <div className="cover-overlay">
                        <Button
                          type="primary"
                          size="large"
                          icon={<PlayCircleOutlined />}
                          onClick={() => playTrack(podcast)}
                        >
                          立即收听
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <Space direction="vertical" size={2} style={{ width: '100%' }}>
                        <Text strong className="podcast-title">{podcast.title}</Text>
                        <Space size={4}>
                          {podcast.category.map(cat => (
                            <Tag key={cat} color="blue">{cat}</Tag>
                          ))}
                        </Space>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={8} style={{ width: '100%' }}>
                        <div className="podcast-description">
                          <div style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {podcast.description}
                          </div>
                        </div>
                        <Space split={<Text type="secondary">|</Text>}>
                          <Space>
                            <Avatar size="small" icon={<UserOutlined />} />
                            {podcast.artist}
                          </Space>
                          <Text type="secondary">
                            <ClockCircleOutlined /> {formatDuration(podcast.duration)}
                          </Text>
                        </Space>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Statistic
                              value={formatNumber(podcast.listens)}
                              suffix="播放"
                              valueStyle={{ fontSize: '14px' }}
                            />
                          </Col>
                          <Col span={8}>
                            <Statistic
                              value={formatNumber(podcast.likes)}
                              suffix="赞"
                              valueStyle={{ fontSize: '14px' }}
                            />
                          </Col>
                          <Col span={8}>
                            <Statistic
                              value={formatNumber(podcast.comments)}
                              suffix="评论"
                              valueStyle={{ fontSize: '14px' }}
                            />
                          </Col>
                        </Row>
                        <Space className="action-buttons">
                          <Button
                            type="text"
                            icon={<LikeOutlined />}
                            onClick={() => {}}
                          >
                            {formatNumber(podcast.likes)}
                          </Button>
                          <Button
                            type="text"
                            icon={<MessageOutlined />}
                            onClick={() => {}}
                          >
                            {formatNumber(podcast.comments)}
                          </Button>
                          <Button
                            type="text"
                            icon={<ShareAltOutlined />}
                            onClick={() => {}}
                          >
                            分享
                          </Button>
                          <Tooltip title="添加到播放队列">
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() => addToQueue(podcast)}
                            />
                          </Tooltip>
                        </Space>
                      </Space>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={<span><RiseOutlined />趋势解读</span>} key="2">
          {/* 趋势解读内容 */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AINewsDemo;
