import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  image: string;
  city: string;
  isActive: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchQuery = '';
  selectedCategory = 'All';

  categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Sushi', icon: '🍱' },
    { name: 'Mexican', icon: '🌮' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Salads', icon: '🥗' },
    { name: 'Desserts', icon: '🍰' },
  ];

  restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Mario Pizza',
      category: 'Pizza',
      rating: 4.7,
      deliveryTime: 25,
      deliveryFee: 2.99,
      minOrder: 10,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
    {
      id: 2,
      name: 'Burger House',
      category: 'Burgers',
      rating: 4.5,
      deliveryTime: 20,
      deliveryFee: 1.99,
      minOrder: 8,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
    {
      id: 3,
      name: 'Sushi World',
      category: 'Sushi',
      rating: 4.8,
      deliveryTime: 35,
      deliveryFee: 3.99,
      minOrder: 15,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
    {
      id: 4,
      name: 'Taco Fiesta',
      category: 'Mexican',
      rating: 4.3,
      deliveryTime: 30,
      deliveryFee: 2.49,
      minOrder: 12,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
    {
      id: 5,
      name: 'Dragon Palace',
      category: 'Chinese',
      rating: 4.4,
      deliveryTime: 40,
      deliveryFee: 2.99,
      minOrder: 15,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
    {
      id: 6,
      name: 'Spice Garden',
      category: 'Indian',
      rating: 4.6,
      deliveryTime: 45,
      deliveryFee: 3.49,
      minOrder: 20,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop',
      city: 'New York',
      isActive: true
    },
  ];

  get filteredRestaurants(): Restaurant[] {
    return this.restaurants.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || r.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }
}
