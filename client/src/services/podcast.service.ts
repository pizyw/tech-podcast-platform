import api from './api';
import { Podcast, PodcastFormData, PodcastFilters, PodcastsResponse } from '../types/podcast.types';

export const podcastService = {
  // 获取播客列表
  async getPodcasts(filters: PodcastFilters): Promise<PodcastsResponse> {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get<PodcastsResponse>(`/podcasts?${params}`);
    return response.data;
  },

  // 获取单个播客
  async getPodcast(id: string): Promise<Podcast> {
    const response = await api.get<Podcast>(`/podcasts/${id}`);
    return response.data;
  },

  // 创建播客
  async createPodcast(formData: PodcastFormData): Promise<Podcast> {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.coverImage) {
      data.append('coverImage', formData.coverImage);
    }
    if (formData.audioFile) {
      data.append('audioFile', formData.audioFile);
    }
    formData.category.forEach(cat => data.append('category[]', cat));
    formData.tags.forEach(tag => data.append('tags[]', tag));

    const response = await api.post<{ podcast: Podcast }>('/podcasts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.podcast;
  },

  // 更新播客
  async updatePodcast(id: string, formData: Partial<PodcastFormData>): Promise<Podcast> {
    const data = new FormData();
    if (formData.title) data.append('title', formData.title);
    if (formData.description) data.append('description', formData.description);
    if (formData.coverImage) data.append('coverImage', formData.coverImage);
    if (formData.audioFile) data.append('audioFile', formData.audioFile);
    if (formData.category) {
      formData.category.forEach(cat => data.append('category[]', cat));
    }
    if (formData.tags) {
      formData.tags.forEach(tag => data.append('tags[]', tag));
    }

    const response = await api.put<{ podcast: Podcast }>(`/podcasts/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.podcast;
  },

  // 删除播客
  async deletePodcast(id: string): Promise<void> {
    await api.delete(`/podcasts/${id}`);
  },

  // 更新播放次数
  async updatePlays(id: string): Promise<number> {
    const response = await api.put<{ plays: number }>(`/podcasts/${id}/plays`);
    return response.data.plays;
  },

  // 喜欢/取消喜欢播客
  async toggleLike(id: string): Promise<void> {
    await api.post(`/podcasts/${id}/like`);
  }
};
