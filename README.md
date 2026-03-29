# E-commerce Food Store

This workspace contains a full-stack food delivery platform:

- **Frontend:** Angular 17+ application in `food-delivery-frontend`
- **Backend:** ASP.NET Core 8 Web API in `FoodDeliveryAPI`

## How to run

### Backend
1. Navigate to `FoodDeliveryAPI` and run `dotnet restore`.
2. Configure your MySQL connection string in `appsettings.json`.
3. Run `dotnet ef database update` to apply migrations.
4. Start the API with `dotnet run`.

### Frontend
1. Navigate to `food-delivery-frontend`.
2. Install dependencies with `npm install`.
3. Run the development server with `npm start`.

Authentication uses JWT tokens; the Angular app expects the API at `http://localhost:5000` by default.

The structure and architecture are outlined in the project overview.
