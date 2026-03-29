import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { RestaurantService, Restaurant, MenuItem } from '../../core/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurantId: number = 0;
  selectedCategory: string = 'All';
  isLoading = true;

  restaurant: Restaurant = {
    id: 0,
    name: '',
    description: '',
    logoUrl: '',
    coverImageUrl: '',
    address: '',
    city: '',
    deliveryFee: 0,
    minOrderAmount: 0,
    estimatedDeliveryMinutes: 0,
    rating: 0,
    category: '',
    isActive: true
  };

  menuItems: MenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = Number(params['id']);
      this.isLoading = true;
      this.menuItems = [];
      this.selectedCategory = 'All';

      this.restaurantService.getRestaurantById(this.restaurantId).subscribe(data => {
        this.restaurant = data;
      });

      this.restaurantService.getMenuItems(this.restaurantId).subscribe(data => {
        this.menuItems = data;
        this.isLoading = false;
      });
    });
  }

  get categoryLabels(): string[] {
    const all = this.menuItems.map(i => i.categoryLabel);
    return ['All', ...new Set(all)];
  }

  get itemsByCategory(): { label: string; items: MenuItem[] }[] {
    const labels = [...new Set(this.menuItems.map(i => i.categoryLabel))];
    return labels.map(label => ({
      label,
      items: this.menuItems.filter(i => i.categoryLabel === label)
    }));
  }

  getCartQuantity(menuItemId: number): number {
    return this.cartService.getQuantity(menuItemId);
  }

  addToCart(menuItem: MenuItem) {
    this.cartService.addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.imageUrl,
      quantity: 1,
      restaurantName: this.restaurant.name,
      restaurantId: this.restaurant.id
    });
  }

  removeFromCart(menuItemId: number) {
    this.cartService.removeItem(menuItemId);
  }

  get cartItems() {
    return this.cartService.getItems();
  }

  get cartTotal(): number {
    return this.cartService.getSubtotal();
  }

  get cartItemCount(): number {
    return this.cartService.getTotalItems();
  }
}
