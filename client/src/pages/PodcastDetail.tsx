import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Avatar,
  Tag,
  Divider,
  List,
  Rate,
  Statistic,
  Tabs,
  Tooltip,
  Input,
  Form
} from 'antd';
import {
  PlayCircleOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  LikeOutlined,
  StarOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { usePlayer } from '../contexts/PlayerContext';
import './PodcastDetail.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

interface PodcastDetail {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
    title: string;
    followers: number;
  };
  coverImage: string;
  description: string;
  publishDate: string;
  duration: number;
  category: string[];
  tags: string[];
  stats: {
    plays: number;
    likes: number;
    comments: number;
    rating: number;
  };
  transcript: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  likes: number;
  replies?: Comment[];
}

const podcastData: PodcastDetail = {
  id: '1',
  title: '深度解析：GPT-4的技术突破与未来展望',
  host: {
    name: '张教授',
    avatar: 'https://picsum.photos/100/100?random=1',
    title: 'AI研究员 & 科技评论家',
    followers: 52000
  },
  coverImage: 'https://picsum.photos/800/400?random=1',
  description: '本期节目深入探讨GPT-4的核心技术创新，包括多模态理解能力的突破、知识表示的改进，以及在实际应用中的表现。同时，我们也将讨论大语言模型未来的发展方向和可能带来的社会影响。',
  publishDate: '2024-03-15',
  duration: 3600,
  category: ['AI技术', '深度学习'],
  tags: ['GPT-4', '机器学习', '人工智能', '技术创新'],
  stats: {
    plays: 25600,
    likes: 1890,
    comments: 356,
    rating: 4.8
  },
  transcript: '本期节目文字稿...'
};

const comments: Comment[] = [
  {
    id: '1',
    author: '技术爱好者',
    avatar: 'https://picsum.photos/50/50?random=1',
    content: '非常专业的解读，对理解GPT-4的技术细节很有帮助！',
    datetime: '2024-03-16 10:30',
    likes: 45,
    replies: [
      {
        id: '1-1',
        author: '张教授',
        avatar: 'https://picsum.photos/50/50?random=2',
        content: '感谢支持，后续会有更多技术深度内容',
        datetime: '2024-03-16 11:00',
        likes: 12
      }
    ]
  }
];

const PodcastDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isLiked, setIsLiked] = useState(false);
  const { playTrack } = usePlayer();

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const formatNumber = (num: number): string => {
    return num >= 10000 ? `${(num / 10000).toFixed(1)}万` : num.toString();
  };

  return (
    <Layout className="podcast-detail">
      <div className="podcast-header">
        <Row gutter={24} align="middle">
          <Col xs={24} sm={24} md={8} lg={6}>
            <div className="cover-image">
              <img src={podcastData.coverImage} alt={podcastData.title} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            <Space direction="vertical" size="large" className="podcast-info">
              <Title level={2}>{podcastData.title}</Title>
              
              <Space split={<Divider type="vertical" />}>
                <Space>
                  <Avatar src={podcastData.host.avatar} />
                  <Text strong>{podcastData.host.name}</Text>
                </Space>
                <Text>
                  <ClockCircleOutlined /> {formatDuration(podcastData.duration)}
                </Text>
                <Text>
                  <CalendarOutlined /> {podcastData.publishDate}
                </Text>
              </Space>

              <Space wrap>
                {podcastData.category.map(cat => (
                  <Tag key={cat} color="blue">{cat}</Tag>
                ))}
                {podcastData.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>

              <Row gutter={32}>
                <Col>
                  <Statistic 
                    title="播放" 
                    value={formatNumber(podcastData.stats.plays)} 
                    prefix={<PlayCircleOutlined />} 
                  />
                </Col>
                <Col>
                  <Statistic 
                    title="点赞" 
                    value={formatNumber(podcastData.stats.likes)} 
                    prefix={<LikeOutlined />} 
                  />
                </Col>
                <Col>
                  <Statistic 
                    title="评论" 
                    value={formatNumber(podcastData.stats.comments)} 
                    prefix={<MessageOutlined />} 
                  />
                </Col>
                <Col>
                  <Statistic 
                    title="评分" 
                    value={podcastData.stats.rating} 
                    prefix={<StarOutlined />} 
                  />
                </Col>
              </Row>

              <Space size="large">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<PlayCircleOutlined />}
                  onClick={() => playTrack({
                    id: podcastData.id,
                    title: podcastData.title,
                    artist: podcastData.host.name,
                    coverImage: podcastData.coverImage,
                    audioUrl: `/api/podcasts/${podcastData.id}/audio`,
                    duration: podcastData.duration
                  })}
                >
                  立即收听
                </Button>
                <Button 
                  size="large" 
                  icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? '已收藏' : '收藏'}
                </Button>
                <Button 
                  size="large" 
                  icon={<ShareAltOutlined />}
                >
                  分享
                </Button>
                <Button 
                  size="large" 
                  icon={<DownloadOutlined />}
                >
                  下载
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="detail-tabs">
        <TabPane tab="节目简介" key="1">
          <Card>
            <Paragraph>{podcastData.description}</Paragraph>
          </Card>
        </TabPane>
        
        <TabPane tab="评论讨论" key="2">
          <Card>
            <div className="comment-section">
              <div className="comment-form">
                <div className="comment-input">
                  <Avatar icon={<UserOutlined />} />
                  <Form.Item>
                    <TextArea rows={4} placeholder="分享你的想法..." />
                  </Form.Item>
                  <Button type="primary">发表评论</Button>
                </div>
              </div>
              
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Tooltip title="点赞">
                        <Space>
                          <LikeOutlined />
                          <span>{item.likes}</span>
                        </Space>
                      </Tooltip>,
                      <span>回复</span>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.author}
                      description={
                        <>
                          <div>{item.content}</div>
                          <div className="comment-time">{item.datetime}</div>
                        </>
                      }
                    />
                    {item.replies && (
                      <List
                        className="reply-list"
                        itemLayout="horizontal"
                        dataSource={item.replies}
                        renderItem={reply => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={reply.avatar} />}
                              title={reply.author}
                              description={
                                <>
                                  <div>{reply.content}</div>
                                  <div className="comment-time">{reply.datetime}</div>
                                </>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="文字稿" key="3">
          <Card>
            <Paragraph>{podcastData.transcript}</Paragraph>
          </Card>
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default PodcastDetail;
