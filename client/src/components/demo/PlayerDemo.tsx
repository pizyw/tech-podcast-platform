import React from 'react';
import { Button, Card, List, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { usePlayer } from '../../contexts/PlayerContext';
import { AudioTrack } from '../../types/player.types';

const { Title } = Typography;

// 示例播客数据
const demoTracks: AudioTrack[] = [
  {
    id: '1',
    title: '人工智能发展前沿',
    artist: '科技新知',
    coverImage: 'https://picsum.photos/200/200',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    duration: 180
  },
  {
    id: '2',
    title: '区块链技术解析',
    artist: '区块链研究所',
    coverImage: 'https://picsum.photos/200/200',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav',
    duration: 240
  },
  {
    id: '3',
    title: 'Web3.0 开发实战',
    artist: '全栈工程师',
    coverImage: 'https://picsum.photos/200/200',
    audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav',
    duration: 300
  }
];

const PlayerDemo: React.FC = () => {
  const { playTrack, addToQueue } = usePlayer();

  return (
    <div className="main-content">
      <Title level={2}>播客列表</Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={demoTracks}
        renderItem={(track) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={track.title}
                  src={track.coverImage}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
              actions={[
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => playTrack(track)}
                >
                  播放
                </Button>,
                <Button onClick={() => addToQueue(track)}>
                  添加到队列
                </Button>
              ]}
            >
              <Card.Meta
                title={track.title}
                description={track.artist}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PlayerDemo;
