using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        [HttpGet("restaurants/{id}/menu-items")]
        public IActionResult GetByRestaurant(int id) => Ok();

        [HttpPost]
        public IActionResult Create([FromBody] object dto) => Ok();

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] object dto) => Ok();

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) => Ok();
    }
}
