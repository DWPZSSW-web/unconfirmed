
export enum ProjectCategory {
  ALL = '全部',
  INSTALLATION = '艺术装置',
  SCULPTURE = '雕塑',
  PUBLIC_ART = '公共艺术',
  SET_DESIGN = '置景'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  imageUrl: string; // Used as cover image or fallback
  videoUrl?: string; // Optional cover video
  description?: string;
  gallery?: string[]; // New: List of images/videos for the slider
}

export interface ComparisonItem {
  id: string;
  title: string;
  renderImage: string;
  realImage: string;
  description: string;
}
