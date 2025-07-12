export interface User {
  Id: number;
  username: string;
  email: string;
  Image?: string;
  points: number;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string[];
  available: boolean;
  isApproved: boolean;
  createdAt: string;
  userId: number;
  user: {
    username: string;
    Image?: string;
  };
  images: ItemImage[];
}

export interface ItemImage {
  id: number;
  url: string;
  itemId: number;
}

export interface Swap {
  id: number;
  senderId: number;
  receiverId: number;
  offeredItemId: number;
  requestedItemId?: number;
  swapType: 'DIRECT' | 'POINTS';
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
  sender: User;
  receiver: User;
  offeredItem: Item;
  requestedItem?: Item;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface CreateItemData {
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string;
}