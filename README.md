# FoodRush - Food Delivery App

A full-stack food delivery application similar to Glovo/Takeaway built with Angular, ASP.NET Core, and MySQL.

##  Tech Stack

- **Frontend:** Angular 17+ (Standalone Components)
- **Backend:** ASP.NET Core 10 Web API
- **Database:** MySQL 8
- **ORM:** Entity Framework Core
- **Auth:** JWT Bearer Tokens

## Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18+)
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [MySQL 8](https://dev.mysql.com/downloads/)
- Angular CLI: `npm install -g @angular/cli`

## 🗄️ Database Setup

1. Open MySQL and create the database:
```sql
CREATE DATABASE fooddelivery;
```

2. Import the database dump:
```bash
mysql -u root -p fooddelivery < database.sql
```

##  Backend Setup

1. Navigate to the backend folder:
```bash
cd FoodDeliveryAPI
```

2. Update your MySQL password in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=fooddelivery;User=root;Password=YOUR_PASSWORD;"
  },
  "Jwt": {
    "Key": "foodrush_super_secret_jwt_key_2024_abcdefgh"
  }
}
```

3. Run the backend:
```bash
dotnet run
```

Backend will start at: `http://localhost:5000`
Swagger UI at: `http://localhost:5000/swagger`

## Frontend Setup

1. Navigate to the frontend folder:
```bash
cd food-delivery-frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the frontend:
```bash
ng serve
```

App will start at: `http://localhost:4200`

##  Test Credentials

Register a new account through the app at `/auth/register`

##  Features

- 🏠 Browse restaurants by category
- 🍕 View restaurant menus
- 🛒 Add items to cart
- 💳 Checkout with Visa / Apple Pay / Cash
- 📦 Real-time order tracking
- 👤 User authentication (Register / Login)
- 🗄️ Full MySQL database integration

##  Project Structure
```
E-commerce food store/
├── FoodDeliveryAPI/          # ASP.NET Core backend
│   ├── Controllers/          # API endpoints
│   ├── Models/               # Database models
│   ├── Data/                 # DbContext
│   └── appsettings.json      # Config (add your DB password)
├── food-delivery-frontend/   # Angular frontend
│   └── src/app/
│       ├── features/         # Pages
│       ├── core/             # Services & guards
│       └── shared/           # Navbar
└── database.sql              # MySQL dump
```