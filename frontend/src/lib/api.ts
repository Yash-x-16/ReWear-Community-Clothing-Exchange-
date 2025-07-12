import axios from 'axios';
import { AuthResponse, CreateItemData, Item, Swap, User } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (data: { username: string; email: string; password: string; image?: string }) =>
    api.post<AuthResponse>('/auth/signup', data),
  
  signin: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/signin', data),
  
  checkAuth: () =>
    api.get<{ user: User }>('/auth/checkAuth'),
};

// Profile API
export const profileAPI = {
  updateProfile: (data: { profileImage: string }) =>
    api.post<{ message: string; user: User }>('/profile/updateProfle', data),
};

// Items API
export const itemsAPI = {
  createItem: (data: CreateItemData) =>
    api.post<{ message: string; item: Item }>('/items/createItem', data),
  
  getAllItems: (params?: { userId?: number; search?: string }) =>
    api.get<Item[]>('/items/items', { params }),
  
  getItemById: (id: number) =>
    api.get<Item>(`/items/${id}`),
  
  deleteItem: (id: number) =>
    api.delete(`/items/deleteItem/${id}`),
};

// Swaps API
export const swapsAPI = {
  requestSwap: (data: { requestedItemId: number; offeredItemId: number }) =>
    api.post<{ message: string; swap: Swap }>('/swaps/request', data),
  
  getUserSwaps: () =>
    api.get<Swap[]>('/swaps/allswap'),
  
  respondToSwap: (id: number, action: 'ACCEPTED' | 'REJECTED') =>
    api.post(`/swaps/respond/${id}`, { action }),
};

// Admin API
export const adminAPI = {
  getPendingItems: () =>
    api.get<Item[]>('/admin/pending'),
  
  approveItem: (id: number) =>
    api.post(`/admin/approve/${id}`),
  
  rejectItem: (id: number) =>
    api.post(`/admin/reject/${id}`),
};

export default api;