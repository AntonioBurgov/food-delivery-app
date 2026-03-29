using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodDeliveryAPI.Data;

namespace FoodDeliveryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public RestaurantsController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var restaurants = await _db.Restaurants
                .Where(r => r.IsActive)
                .Select(r => new {
                    r.Id,
                    Name = r.Name ?? string.Empty,
                    Description = r.Description ?? string.Empty,
                    LogoUrl = r.LogoUrl ?? string.Empty,
                    CoverImageUrl = r.CoverImageUrl ?? string.Empty,
                    Address = r.Address ?? string.Empty,
                    City = r.City ?? string.Empty,
                    r.DeliveryFee,
                    r.MinOrderAmount,
                    r.EstimatedDeliveryMinutes,
                    r.Rating,
                    r.IsActive,
                    Category = r.Category ?? string.Empty
                })
                .ToListAsync();

            return Ok(restaurants);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var restaurant = await _db.Restaurants
                .Where(r => r.Id == id)
                .Select(r => new {
                    r.Id,
                    Name = r.Name ?? string.Empty,
                    Description = r.Description ?? string.Empty,
                    LogoUrl = r.LogoUrl ?? string.Empty,
                    CoverImageUrl = r.CoverImageUrl ?? string.Empty,
                    Address = r.Address ?? string.Empty,
                    City = r.City ?? string.Empty,
                    r.DeliveryFee,
                    r.MinOrderAmount,
                    r.EstimatedDeliveryMinutes,
                    r.Rating,
                    r.IsActive,
                    Category = r.Category ?? string.Empty
                })
                .FirstOrDefaultAsync();

            if (restaurant == null) return NotFound();
            return Ok(restaurant);
        }

        [HttpGet("{id}/menu-items")]
        public async Task<IActionResult> GetMenuItems(int id)
        {
            var items = await _db.MenuItems
                .Where(m => m.RestaurantId == id)
                .Select(m => new {
                    m.Id,
                    m.RestaurantId,
                    Name = m.Name ?? string.Empty,
                    Description = m.Description ?? string.Empty,
                    m.Price,
                    ImageUrl = m.ImageUrl ?? string.Empty,
                    CategoryLabel = m.CategoryLabel ?? string.Empty,
                    m.IsAvailable
                })
                .ToListAsync();

            return Ok(items);
        }
    }
}