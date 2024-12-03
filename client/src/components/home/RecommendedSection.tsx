import React from 'react';
import { Card, Row, Col, Typography, Tag, Button, Avatar, Tooltip, Carousel } from 'antd';
import { PlayCircleOutlined, UserOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import './RecommendedSection.css';

const { Title, Text } = Typography;

interface Podcast {
  id: string;
  title: string;
  host: string;
  category: string[];
  duration: number;
  coverImage: string;
  listens: number;
  description: string;
}

const recommendedPodcasts: Podcast[] = [
  {
    id: '1',
    title: '2024年AI技术展望：从GPT到量子计算',
    host: '张教授',
    category: ['AI前沿', '技术预测'],
    duration: 3600,
    coverImage: 'https://picsum.photos/400/300?random=1',
    listens: 15000,
    description: '深入探讨2024年AI技术发展趋势，涵盖大语言模型、量子计算等热门话题。'
  },
  {
    id: '2',
    title: '硅谷创业实录：从0到1的AI创业之路',
    host: '李创始人',
    category: ['创业故事', 'AI创投'],
    duration: 2700,
    coverImage: 'https://picsum.photos/400/300?random=2',
    listens: 12000,
    description: '第一手的硅谷AI创业经验分享，从产品定位到融资策略的全方位解析。'
  },
  {
    id: '3',
    title: '开源AI的未来：社区驱动的技术革新',
    host: '王工程师',
    category: ['开源技术', 'AI社区'],
    duration: 3300,
    coverImage: 'https://picsum.photos/400/300?random=3',
    listens: 9800,
    description: '探讨开源AI项目的发展现状和未来方向，以及社区协作的重要性。'
  }
];

const RecommendedSection: React.FC = () => {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const formatListens = (num: number): string => {
    return num > 10000 ? `${(num / 10000).toFixed(1)}万` : num.toString();
  };

  return (
    <div className="recommended-section">
      <div className="section-header">
        <Title level={3}>
          <FireOutlined /> 为你推荐
        </Title>
        <Text type="secondary">根据你的收听历史，这些内容你可能感兴趣</Text>
      </div>

      <Carousel autoplay className="recommended-carousel">
        <div>
          <Row gutter={24}>
            {recommendedPodcasts.map(podcast => (
              <Col key={podcast.id} xs={24} sm={24} md={8} lg={8}>
                <Card
                  hoverable
                  className="podcast-card"
                  cover={
                    <div className="card-cover">
                      <img alt={podcast.title} src={podcast.coverImage} />
                      <div className="cover-overlay">
                        <Button 
                          type="primary" 
                          size="large"
                          icon={<PlayCircleOutlined />}
                          className="play-button"
                        >
                          立即收听
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <div className="card-title">
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <Text strong>{podcast.title}</Text>
                        </div>
                        <div className="card-tags">
                          {podcast.category.map(tag => (
                            <Tag key={tag} color="blue">{tag}</Tag>
                          ))}
                        </div>
                      </div>
                    }
                    description={
                      <div className="card-info">
                        <div className="host-info">
                          <Avatar icon={<UserOutlined />} size="small" />
                          <Text>{podcast.host}</Text>
                        </div>
                        <div className="podcast-stats">
                          <Tooltip title="时长">
                            <span>
                              <ClockCircleOutlined /> {formatDuration(podcast.duration)}
                            </span>
                          </Tooltip>
                          <Tooltip title="收听次数">
                            <span>
                              <FireOutlined /> {formatListens(podcast.listens)}
                            </span>
                          </Tooltip>
                        </div>
                        <div style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {podcast.description}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Carousel>
    </div>
  );
};

export default RecommendedSection;
