using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using FoodDeliveryAPI.Data;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public OrdersController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var orders = await _db.Orders
                .Where(o => o.CustomerId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .Include(o => o.Restaurant)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new {
                    o.Id,
                    RestaurantName = o.Restaurant!.Name,
                    RestaurantImage = o.Restaurant.CoverImageUrl,
                    o.Status,
                    o.TotalAmount,
                    o.CreatedAt,
                    Items = o.OrderItems.Select(oi => new {
                        oi.MenuItem!.Name,
                        oi.Quantity,
                        Price = oi.UnitPrice
                    })
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest req)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var order = new Order
            {
                CustomerId = userId,
                RestaurantId = req.RestaurantId,
                DeliveryAddressId = 1,
                Status = "Pending",
                TotalAmount = req.TotalAmount,
                DeliveryFee = req.DeliveryFee,
                PaymentMethod = req.PaymentMethod,
                PaymentStatus = "Pending",
                Notes = req.Notes ?? string.Empty,
                OrderItems = req.Items.Select(i => new OrderItem
                {
                    MenuItemId = i.MenuItemId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList()
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            return Ok(new { order.Id, order.Status });
        }
    }

    public record CreateOrderRequest(
        int RestaurantId,
        decimal TotalAmount,
        decimal DeliveryFee,
        string PaymentMethod,
        string? Notes,
        List<OrderItemRequest> Items
    );

    public record OrderItemRequest(int MenuItemId, int Quantity, decimal UnitPrice);
}
