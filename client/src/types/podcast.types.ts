export interface Podcast {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  audioUrl: string;
  duration: number;
  creator: {
    _id: string;
    username: string;
    avatar?: string;
  };
  category: string[];
  tags: string[];
  likes: number;
  plays: number;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PodcastFormData {
  title: string;
  description: string;
  coverImage: File | null;
  audioFile: File | null;
  category: string[];
  tags: string[];
}

export interface PodcastsResponse {
  podcasts: Podcast[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface PodcastFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}
