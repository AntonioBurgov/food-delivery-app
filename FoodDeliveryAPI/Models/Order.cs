namespace FoodDeliveryAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int RestaurantId { get; set; }
        public int DeliveryAddressId { get; set; }
        public string? Status { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DeliveryFee { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }
        public string? Notes { get; set; }
        public string? PaymentIntentId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User? Customer { get; set; }
        public Restaurant? Restaurant { get; set; }
        public Address? DeliveryAddress { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
