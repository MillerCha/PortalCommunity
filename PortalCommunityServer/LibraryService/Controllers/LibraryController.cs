using Microsoft.AspNetCore.Mvc;

namespace LibraryService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibraryController : ControllerBase
    {
        

        private readonly ILogger<LibraryController> _logger;

        public LibraryController(ILogger<LibraryController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Registration")]
        public IActionResult Registration()
        {
            return Ok(new
            {
                Message = "נרשמת בהצלחה"
            });
        }
    }
}
