namespace FoodDeliveryAPI.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public string? CoverImageUrl { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Category { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal MinOrderAmount { get; set; }
        public int EstimatedDeliveryMinutes { get; set; }
        public decimal Rating { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User? Owner { get; set; }
        public List<MenuItem> MenuItems { get; set; } = new();
    }
}