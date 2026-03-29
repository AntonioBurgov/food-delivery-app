import { OrderItem } from './order-item';

export interface Order {
  id: number;
  restaurantId: number;
  customerId: number;
  status: string;
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  orderItems?: OrderItem[];
}
