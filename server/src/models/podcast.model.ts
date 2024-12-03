import mongoose, { Document } from 'mongoose';

export interface IPodcast extends Document {
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: number;
  creator: mongoose.Types.ObjectId;
  category: string[];
  tags: string[];
  likes: number;
  plays: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  coverImage: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  plays: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// 添加全文搜索索引
podcastSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});

export const Podcast = mongoose.model<IPodcast>('Podcast', podcastSchema);
