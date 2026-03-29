using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet("profile")]
        public IActionResult Profile() => Ok();

        [HttpPut("profile")]
        public IActionResult UpdateProfile([FromBody] object dto) => Ok();

        [HttpPost("addresses")]
        public IActionResult AddAddress([FromBody] object dto) => Ok();

        [HttpGet("addresses")]
        public IActionResult GetAddresses() => Ok();

        [HttpPut("addresses/{id}")]
        public IActionResult UpdateAddress(int id, [FromBody] object dto) => Ok();

        [HttpDelete("addresses/{id}")]
        public IActionResult DeleteAddress(int id) => Ok();
    }
}
