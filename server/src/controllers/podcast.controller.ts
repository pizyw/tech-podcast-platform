import { Request, Response } from 'express';
import { Podcast } from '../models/podcast.model';

// 创建新播客
export const createPodcast = async (req: Request, res: Response) => {
  try {
    const podcastData = {
      ...req.body,
      creator: req.user?.id
    };
    
    const podcast = new Podcast(podcastData);
    await podcast.save();
    
    res.status(201).json({
      message: '播客创建成功',
      podcast
    });
  } catch (error) {
    res.status(500).json({
      message: '创建播客失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 获取播客列表
export const getPodcasts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    const podcasts = await Podcast.find(query)
      .populate('creator', 'username avatar')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
      
    const total = await Podcast.countDocuments(query);
    
    res.json({
      podcasts,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({
      message: '获取播客列表失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 获取单个播客详情
export const getPodcastById = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findById(req.params.id)
      .populate('creator', 'username avatar bio');
      
    if (!podcast) {
      return res.status(404).json({ message: '播客不存在' });
    }
    
    res.json(podcast);
  } catch (error) {
    res.status(500).json({
      message: '获取播客详情失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 更新播客信息
export const updatePodcast = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    
    if (!podcast) {
      return res.status(404).json({ message: '播客不存在' });
    }
    
    if (podcast.creator.toString() !== req.user?.id) {
      return res.status(403).json({ message: '没有权限修改此播客' });
    }
    
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({
      message: '播客更新成功',
      podcast: updatedPodcast
    });
  } catch (error) {
    res.status(500).json({
      message: '更新播客失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 删除播客
export const deletePodcast = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    
    if (!podcast) {
      return res.status(404).json({ message: '播客不存在' });
    }
    
    if (podcast.creator.toString() !== req.user?.id) {
      return res.status(403).json({ message: '没有权限删除此播客' });
    }
    
    await podcast.deleteOne();
    
    res.json({ message: '播客删除成功' });
  } catch (error) {
    res.status(500).json({
      message: '删除播客失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 更新播放次数
export const updatePlays = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true }
    );
    
    if (!podcast) {
      return res.status(404).json({ message: '播客不存在' });
    }
    
    res.json({ plays: podcast.plays });
  } catch (error) {
    res.status(500).json({
      message: '更新播放次数失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 喜欢/取消喜欢播客
export const toggleLike = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    
    if (!podcast) {
      return res.status(404).json({ message: '播客不存在' });
    }
    
    const userId = req.user?.id;
    const liked = await Podcast.findOne({
      _id: req.params.id,
      likes: userId
    });
    
    if (liked) {
      await Podcast.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: userId } }
      );
      res.json({ message: '取消喜欢成功' });
    } else {
      await Podcast.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: userId } }
      );
      res.json({ message: '喜欢成功' });
    }
  } catch (error) {
    res.status(500).json({
      message: '操作失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};
