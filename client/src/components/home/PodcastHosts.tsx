import React from 'react';
import { Row, Col, Card, Avatar, Typography, Button, Space, Tooltip, Badge } from 'antd';
import {
  PlayCircleOutlined,
  UserOutlined,
  TrophyOutlined,
  StarOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import './PodcastHosts.css';

const { Title, Text } = Typography;

interface Host {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  followers: number;
  episodes: number;
  totalListens: number;
  rating: number;
  tags: string[];
  latestEpisode: {
    title: string;
    date: string;
    duration: string;
  };
  verified: boolean;
  featured: boolean;
}

const topHosts: Host[] = [
  {
    id: '1',
    name: '张教授',
    avatar: 'https://picsum.photos/200/200?random=1',
    title: 'AI研究员 & 科技评论家',
    bio: '斯坦福大学AI研究员，专注于深度学习和人工智能伦理研究，著有《AI新纪元》',
    followers: 52000,
    episodes: 128,
    totalListens: 890000,
    rating: 4.9,
    tags: ['人工智能', '深度学习', '科技伦理'],
    latestEpisode: {
      title: 'GPT-4的技术突破与局限',
      date: '2024-03-15',
      duration: '45:00'
    },
    verified: true,
    featured: true
  },
  {
    id: '2',
    name: '李工程师',
    avatar: 'https://picsum.photos/200/200?random=2',
    title: '全栈工程师 & 技术布道者',
    bio: '前谷歌高级工程师，现独立开发者。擅长Web3和区块链技术，热衷技术分享',
    followers: 38000,
    episodes: 95,
    totalListens: 650000,
    rating: 4.8,
    tags: ['Web3', '区块链', '全栈开发'],
    latestEpisode: {
      title: '构建去中心化应用实战',
      date: '2024-03-14',
      duration: '50:00'
    },
    verified: true,
    featured: false
  },
  {
    id: '3',
    name: '王博士',
    avatar: 'https://picsum.photos/200/200?random=3',
    title: '量子计算研究员',
    bio: '量子计算领域专家，致力于普及前沿科技知识，多次获得科技传播奖项',
    followers: 45000,
    episodes: 86,
    totalListens: 720000,
    rating: 4.7,
    tags: ['量子计算', '物理科技', '前沿研究'],
    latestEpisode: {
      title: '量子优越性的最新进展',
      date: '2024-03-13',
      duration: '40:00'
    },
    verified: true,
    featured: true
  }
];

const PodcastHosts: React.FC = () => {
  const formatNumber = (num: number): string => {
    return num >= 10000 ? `${(num / 10000).toFixed(1)}万` : num.toString();
  };

  return (
    <div className="podcast-hosts">
      <div className="section-header">
        <Title level={3}>
          <TrophyOutlined /> 优秀播主
        </Title>
        <Text type="secondary">聆听科技领域的专业声音</Text>
      </div>

      <Row gutter={[24, 24]}>
        {topHosts.map(host => (
          <Col key={host.id} xs={24} sm={24} md={8} lg={8}>
            <Badge.Ribbon 
              text={host.featured ? "🎖️ 特邀主播" : ""}
              color="gold"
              style={{ display: host.featured ? 'block' : 'none' }}
            >
              <Card className="host-card" hoverable>
                <div className="host-header">
                  <Avatar 
                    size={80} 
                    src={host.avatar}
                    className={host.verified ? 'verified' : ''}
                  />
                  <div className="host-title">
                    <Space>
                      <Text strong className="host-name">{host.name}</Text>
                      {host.verified && (
                        <Tooltip title="认证主播">
                          <Badge status="success" />
                        </Tooltip>
                      )}
                    </Space>
                    <Text type="secondary">{host.title}</Text>
                  </div>
                </div>

                <div style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }} className="host-bio">
                  {host.bio}
                </div>

                <div className="host-stats">
                  <div className="stat-item">
                    <TeamOutlined />
                    <span>{formatNumber(host.followers)} 关注</span>
                  </div>
                  <div className="stat-item">
                    <ThunderboltOutlined />
                    <span>{host.episodes} 节目</span>
                  </div>
                  <div className="stat-item">
                    <StarOutlined />
                    <span>{host.rating} 评分</span>
                  </div>
                </div>

                <div className="host-tags">
                  {host.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <Card className="latest-episode">
                  <div className="episode-info">
                    <div>
                      <Text strong>最新节目</Text>
                      <Text className="episode-title">{host.latestEpisode.title}</Text>
                    </div>
                    <Space size="small" className="episode-meta">
                      <ScheduleOutlined />
                      <Text type="secondary">{host.latestEpisode.duration}</Text>
                    </Space>
                  </div>
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    className="play-button"
                  >
                    立即收听
                  </Button>
                </Card>

                <div className="host-actions">
                  <Button type="primary" block>
                    关注主播
                  </Button>
                  <Button block>
                    查看全部节目
                  </Button>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <div className="view-more">
        <Button type="link" size="large">
          发现更多优秀主播 <UserOutlined />
        </Button>
      </div>
    </div>
  );
};

export default PodcastHosts;
