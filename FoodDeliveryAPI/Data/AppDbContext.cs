using Microsoft.EntityFrameworkCore;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Restaurant> Restaurants => Set<Restaurant>();
        public DbSet<MenuItem> MenuItems => Set<MenuItem>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Address> Addresses => Set<Address>();
        public DbSet<Category> Categories => Set<Category>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Decimal precision
            modelBuilder.Entity<MenuItem>()
                .Property(m => m.Price)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Restaurant>()
                .Property(r => r.DeliveryFee)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Restaurant>()
                .Property(r => r.MinOrderAmount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.DeliveryFee)
                .HasPrecision(10, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasPrecision(10, 2);

            // Restaurant -> MenuItems
            modelBuilder.Entity<MenuItem>()
                .HasOne(m => m.Restaurant)
                .WithMany(r => r.MenuItems)
                .HasForeignKey(m => m.RestaurantId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order -> OrderItems
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            // User -> Addresses
            modelBuilder.Entity<Address>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId);
        }
    }
}
