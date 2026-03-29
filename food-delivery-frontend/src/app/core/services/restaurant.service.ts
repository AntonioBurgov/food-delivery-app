import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  address: string;
  city: string;
  deliveryFee: number;
  minOrderAmount: number;
  estimatedDeliveryMinutes: number;
  rating: number;
  category: string;
  isActive: boolean;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryLabel: string;
  isAvailable: boolean;
}

// Fallback mock data in case backend is not running
const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Mario Pizza',
    description: 'Authentic Italian pizza',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=400&fit=crop',
    address: '123 Main St',
    city: 'New York',
    deliveryFee: 2.99,
    minOrderAmount: 10,
    estimatedDeliveryMinutes: 25,
    rating: 4.7,
    category: 'Pizza',
    isActive: true
  },
  {
    id: 2,
    name: 'Burger House',
    description: 'Best burgers in town',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=400&fit=crop',
    address: '456 Oak Ave',
    city: 'New York',
    deliveryFee: 1.99,
    minOrderAmount: 8,
    estimatedDeliveryMinutes: 20,
    rating: 4.5,
    category: 'Burgers',
    isActive: true
  },
  {
    id: 3,
    name: 'Sushi World',
    description: 'Fresh Japanese cuisine',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&h=400&fit=crop',
    address: '789 Pine Rd',
    city: 'New York',
    deliveryFee: 3.99,
    minOrderAmount: 15,
    estimatedDeliveryMinutes: 35,
    rating: 4.8,
    category: 'Sushi',
    isActive: true
  },
  {
    id: 4,
    name: 'Taco Fiesta',
    description: 'Fresh Mexican food',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=400&fit=crop',
    address: '321 Elm St',
    city: 'New York',
    deliveryFee: 2.49,
    minOrderAmount: 12,
    estimatedDeliveryMinutes: 30,
    rating: 4.3,
    category: 'Mexican',
    isActive: true
  },
  {
    id: 5,
    name: 'Dragon Palace',
    description: 'Authentic Chinese cuisine',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&h=400&fit=crop',
    address: '654 Maple Dr',
    city: 'New York',
    deliveryFee: 2.99,
    minOrderAmount: 15,
    estimatedDeliveryMinutes: 40,
    rating: 4.4,
    category: 'Chinese',
    isActive: true
  },
  {
    id: 6,
    name: 'Spice Garden',
    description: 'Traditional Indian dishes',
    logoUrl: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&h=400&fit=crop',
    address: '987 Cedar Ln',
    city: 'New York',
    deliveryFee: 3.49,
    minOrderAmount: 20,
    estimatedDeliveryMinutes: 45,
    rating: 4.6,
    category: 'Indian',
    isActive: true
  }
];

const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 1, restaurantId: 1, name: 'Margherita', description: 'Tomato sauce, mozzarella, fresh basil', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop', categoryLabel: 'Classic Pizzas', isAvailable: true },
  { id: 2, restaurantId: 1, name: 'Pepperoni', description: 'Tomato sauce, mozzarella, pepperoni', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop', categoryLabel: 'Classic Pizzas', isAvailable: true },
  { id: 3, restaurantId: 1, name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=300&h=200&fit=crop', categoryLabel: 'Starters', isAvailable: true },
  { id: 4, restaurantId: 1, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop', categoryLabel: 'Desserts', isAvailable: true },
  { id: 5, restaurantId: 1, name: 'Coca Cola', description: 'Chilled 330ml can', price: 2.49, imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=200&fit=crop', categoryLabel: 'Drinks', isAvailable: true }
];

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`).pipe(
      catchError(() => {
        console.warn('Backend not available — using mock data');
        return of(MOCK_RESTAURANTS);
      })
    );
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`).pipe(
      catchError(() => {
        const mock = MOCK_RESTAURANTS.find(r => r.id === id) || MOCK_RESTAURANTS[0];
        return of(mock);
      })
    );
  }

  getMenuItems(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/restaurants/${restaurantId}/menu-items`).pipe(
      catchError(() => {
        return of(MOCK_MENU_ITEMS.filter(i => i.restaurantId === restaurantId));
      })
    );
  }
}
