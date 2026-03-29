namespace FoodDeliveryAPI.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? CategoryLabel { get; set; }
        public bool IsAvailable { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Restaurant? Restaurant { get; set; }
    }
}
