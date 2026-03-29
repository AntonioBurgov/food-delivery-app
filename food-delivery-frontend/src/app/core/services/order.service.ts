import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantLogo: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'OnTheWay' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  estimatedDelivery: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  getOrders(): Order[] {
    return this.ordersSubject.getValue();
  }

  addOrder(order: Order) {
    const current = this.ordersSubject.getValue();
    this.ordersSubject.next([order, ...current]);
  }

  generateOrderId(): string {
    return 'FD-' + (1000 + Math.floor(Math.random() * 9000));
  }
}
