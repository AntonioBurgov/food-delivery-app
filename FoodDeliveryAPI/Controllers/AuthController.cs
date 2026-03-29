using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FoodDeliveryAPI.Data;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (await _db.Users.AnyAsync(u => u.Email == req.Email))
                return BadRequest(new { message = "Email already in use" });

            var user = new User
            {
                FullName = req.FullName,
                Email = req.Email,
                PasswordHash = HashPassword(req.Password),
                PhoneNumber = req.PhoneNumber ?? string.Empty,
                Role = "Customer"
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new {
                token = GenerateToken(user),
                user = new { user.Id, user.FullName, user.Email, user.Role }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (user == null || !VerifyPassword(req.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid email or password" });

            return Ok(new {
                token = GenerateToken(user),
                user = new { user.Id, user.FullName, user.Email, user.Role }
            });
        }

        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password + "foodrush_salt"));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string password, string hash)
            => HashPassword(password) == hash;

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "supersecretkey1234567890abcdefghij"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public record RegisterRequest(string FullName, string Email, string Password, string? PhoneNumber);
    public record LoginRequest(string Email, string Password);
}
