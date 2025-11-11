// Tipos para o AR Style App

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'shirt' | 'pants' | 'dress' | 'jacket' | 'shoes' | 'accessories';
  imageUrl: string;
  brand?: string;
  price?: number;
}

export interface TryOnResult {
  id: string;
  userId: string;
  originalPhotoUrl: string;
  clothingItem: ClothingItem;
  resultImageUrl: string;
  transparentResultUrl?: string;
  createdAt: Date;
  liked: boolean;
}

export interface ProcessingStatus {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
}

export interface ARSession {
  isActive: boolean;
  clothingItem?: ClothingItem;
  adjustments: {
    scale: number;
    rotation: number;
    position: { x: number; y: number };
  };
}

export type TabType = 'home' | 'gallery' | 'explore' | 'profile';

export interface GalleryItem extends TryOnResult {
  tags: string[];
  isPublic: boolean;
}

export interface TrendingLook {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  clothingItems: ClothingItem[];
  tags: string[];
}