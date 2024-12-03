import React from 'react';
import { Row, Col, Card, Typography, Badge, Statistic, Tag, Button } from 'antd';
import { 
  FireOutlined, 
  RiseOutlined, 
  TeamOutlined, 
  ThunderboltOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import './TrendingTopics.css';

const { Title, Text } = Typography;

interface Topic {
  id: string;
  title: string;
  category: string;
  trend: number;
  listeners: number;
  episodes: number;
  tags: string[];
  coverImage: string;
  isHot: boolean;
}

const trendingTopics: Topic[] = [
  {
    id: '1',
    title: 'AGI与未来智能',
    category: 'AI研究',
    trend: 156,
    listeners: 25600,
    episodes: 42,
    tags: ['AGI', '智能革命', '未来科技'],
    coverImage: 'https://picsum.photos/300/200?random=1',
    isHot: true
  },
  {
    id: '2',
    title: '量子计算前沿',
    category: '量子科技',
    trend: 134,
    listeners: 18900,
    episodes: 35,
    tags: ['量子计算', '量子优势', '科技创新'],
    coverImage: 'https://picsum.photos/300/200?random=2',
    isHot: true
  },
  {
    id: '3',
    title: 'Web3.0生态探索',
    category: '区块链',
    trend: 128,
    listeners: 21300,
    episodes: 38,
    tags: ['Web3', '去中心化', '数字经济'],
    coverImage: 'https://picsum.photos/300/200?random=3',
    isHot: false
  },
  {
    id: '4',
    title: '元宇宙与AR/VR',
    category: '虚拟现实',
    trend: 112,
    listeners: 19500,
    episodes: 31,
    tags: ['元宇宙', 'AR/VR', '交互技术'],
    coverImage: 'https://picsum.photos/300/200?random=4',
    isHot: false
  }
];

const TrendingTopics: React.FC = () => {
  return (
    <div className="trending-topics">
      <div className="section-header">
        <Title level={3}>
          <RiseOutlined /> 热门话题
        </Title>
        <Text type="secondary">发现最受欢迎的科技话题和讨论</Text>
      </div>

      <Row gutter={[24, 24]}>
        {trendingTopics.map(topic => (
          <Col key={topic.id} xs={24} sm={12} md={12} lg={6}>
            <Badge.Ribbon 
              text={topic.isHot ? "🔥 火热话题" : "📈 上升趋势"} 
              color={topic.isHot ? "red" : "blue"}
            >
              <Card
                hoverable
                className="topic-card"
                cover={
                  <div className="topic-cover">
                    <img alt={topic.title} src={topic.coverImage} />
                    <div className="topic-category">
                      <Tag color="magenta">{topic.category}</Tag>
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div className="topic-title">
                      <Text strong>{topic.title}</Text>
                      <div className="trend-indicator">
                        <ArrowUpOutlined style={{ color: '#52c41a' }} />
                        <span>{topic.trend}%</span>
                      </div>
                    </div>
                  }
                  description={
                    <div className="topic-info">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic 
                            title="收听" 
                            value={topic.listeners} 
                            suffix="人"
                            valueStyle={{ fontSize: '14px' }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic 
                            title="节目" 
                            value={topic.episodes} 
                            suffix="期"
                            valueStyle={{ fontSize: '14px' }}
                          />
                        </Col>
                      </Row>
                      <div className="topic-tags">
                        {topic.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <Button type="primary" block className="explore-button">
                        <ThunderboltOutlined /> 探索话题
                      </Button>
                    </div>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <div className="view-more">
        <Button type="link" size="large">
          查看更多热门话题 <RiseOutlined />
        </Button>
      </div>
    </div>
  );
};

export default TrendingTopics;
