import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  restaurantName: string;
  restaurantId: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  getItems(): CartItem[] {
    return this.cartSubject.getValue();
  }

  addItem(item: CartItem) {
    const current = this.cartSubject.getValue();
    const existing = current.find(i => i.id === item.id);
    if (existing) {
      this.cartSubject.next(
        current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      this.cartSubject.next([...current, { ...item, quantity: 1 }]);
    }
  }

  removeItem(itemId: number) {
    const current = this.cartSubject.getValue();
    const existing = current.find(i => i.id === itemId);
    if (existing && existing.quantity > 1) {
      this.cartSubject.next(
        current.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
      );
    } else {
      this.cartSubject.next(current.filter(i => i.id !== itemId));
    }
  }

  deleteItem(itemId: number) {
    this.cartSubject.next(this.cartSubject.getValue().filter(i => i.id !== itemId));
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getQuantity(itemId: number): number {
    const item = this.cartSubject.getValue().find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }

  getTotalItems(): number {
    return this.cartSubject.getValue().reduce((sum, i) => sum + i.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartSubject.getValue().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getRestaurantName(): string {
    const items = this.cartSubject.getValue();
    return items.length > 0 ? items[0].restaurantName : '';
  }
}
