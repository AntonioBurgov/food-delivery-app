import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  deliveryFee = 2.99;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(itemId: number) {
    this.cartService.addItem(
      this.cartItems.find(i => i.id === itemId)!
    );
  }

  decreaseQuantity(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  removeItem(itemId: number) {
    this.cartService.deleteItem(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get subtotal(): number {
    return this.cartService.getSubtotal();
  }

  get total(): number {
    return this.subtotal + (this.cartItems.length > 0 ? this.deliveryFee : 0);
  }

  get totalItems(): number {
    return this.cartService.getTotalItems();
  }

  get restaurantName(): string {
    return this.cartService.getRestaurantName();
  }
}
