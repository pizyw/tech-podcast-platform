# 中文科技播客平台

一个专注于科技内容的中文播客聚合平台，为科技爱好者和从业者提供高质量的音频内容和互动空间。

## 技术栈

### 前端
- React.js
- Ant Design
- TailwindCSS
- Redux Toolkit
- React Router

### 后端
- Node.js
- Express.js
- MongoDB
- Elasticsearch
- Redis

### 部署
- Docker
- Nginx
- AWS S3/阿里云OSS (音频存储)
- CDN

## 项目结构

```
tech-podcast-platform/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── pages/        # 页面组件
│   │   ├── services/     # API服务
│   │   ├── store/        # Redux状态管理
│   │   └── utils/        # 工具函数
│   └── public/           # 静态资源
├── server/                # 后端项目
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── models/       # 数据模型
│   │   ├── routes/       # 路由
│   │   ├── services/     # 业务逻辑
│   │   └── utils/        # 工具函数
│   └── config/           # 配置文件
└── docker/               # Docker配置
```

## 主要功能

1. 用户系统
   - 注册/登录
   - 个人主页
   - 收藏列表

2. 内容系统
   - 播客列表
   - 分类浏览
   - 搜索功能
   - 播放器

3. 创作者中心
   - 内容上传
   - 数据分析
   - 粉丝互动

4. 社区功能
   - 评论系统
   - 科技论坛
   - 问答模块

## 开发环境设置

1. 安装依赖
```bash
# 前端
cd client
npm install

# 后端
cd server
npm install
```

2. 启动开发服务器
```bash
# 前端
cd client
npm run dev

# 后端
cd server
npm run dev
```

## 生产环境部署

1. 构建Docker镜像
```bash
docker-compose build
```

2. 启动服务
```bash
docker-compose up -d
```

## 环境变量配置

创建 `.env` 文件并配置以下环境变量：

```
# 数据库
MONGODB_URI=mongodb://localhost:27017/tech-podcast

# JWT
JWT_SECRET=your_jwt_secret

# 存储服务
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_BUCKET=your_bucket_name

# 其他服务
ELASTICSEARCH_URL=http://localhost:9200
REDIS_URL=redis://localhost:6379
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT
