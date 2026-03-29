import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { CartService, CartItem } from '../../core/services/cart.service';
import { RestaurantService } from '../../core/services/restaurant.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedPayment = 'card';
  isProcessing = false;
  orderPlaced = false;
  placedOrderId = '';

  address = { fullName: '', street: '', city: '', postalCode: '', phone: '' };

  cartItems: CartItem[] = [];
  deliveryFee = 0;
  restaurantImage = '';
  restaurantLogo = '';

  paymentMethods = [
    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
    { id: 'applepay', label: 'Apple Pay', icon: '🍎' },
    { id: 'cash', label: 'Cash on Delivery', icon: '💵' }
  ];

  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  cardName = '';

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      if (items.length > 0) {
        const restaurantId = items[0].restaurantId;
        this.restaurantService.getRestaurantById(restaurantId).subscribe(r => {
          this.restaurantImage = r.coverImageUrl || '';
          this.restaurantLogo = r.logoUrl || '';
          this.deliveryFee = r.deliveryFee;
        });
      }
    });
  }

  get subtotal(): number { return this.cartService.getSubtotal(); }
  get total(): number { return this.subtotal + this.deliveryFee; }
  get totalItems(): number { return this.cartService.getTotalItems(); }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = value.substring(0, 19);
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    this.cardExpiry = value;
  }

  isFormValid(): boolean {
    const addressValid = this.address.fullName && this.address.street &&
      this.address.city && this.address.phone;
    if (this.selectedPayment === 'card') {
      return !!(addressValid && this.cardNumber && this.cardExpiry && this.cardCvv && this.cardName);
    }
    return !!addressValid;
  }

  placeOrder() {
    if (!this.isFormValid()) return;
    this.isProcessing = true;

    setTimeout(() => {
      const newOrderId = this.orderService.generateOrderId();
      this.placedOrderId = newOrderId;

      this.orderService.addOrder({
        id: newOrderId,
        restaurantName: this.cartService.getRestaurantName(),
        restaurantImage: this.restaurantImage,
        restaurantLogo: this.restaurantLogo,
        items: this.cartItems.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price
        })),
        total: this.total,
        status: 'Preparing',
        createdAt: new Date(),
        estimatedDelivery: '25-35 min'
      });

      this.cartService.clearCart();
      this.isProcessing = false;
      this.orderPlaced = true;
    }, 2500);
  }
}
