import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantService, Restaurant } from '../../core/services/restaurant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'All';
  restaurants: Restaurant[] = [];
  isLoading = true;

  categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Sushi', icon: '🍱' },
    { name: 'Mexican', icon: '🌮' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Salads', icon: '🥗' },
    { name: 'Desserts', icon: '🍰' }
  ];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

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
}
