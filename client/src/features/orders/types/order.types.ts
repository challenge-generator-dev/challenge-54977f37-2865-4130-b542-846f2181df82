export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderDto = {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
};

export type UpdateOrderDto = {
  items?: OrderItem[];
  totalAmount?: number;
  status?: string;
};