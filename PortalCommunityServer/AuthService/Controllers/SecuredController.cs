using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecuredController : ControllerBase
    {
        // פעולה זו מאובטחת - רק משתמשים עם JWT תקף יוכלו לגשת אליה
        [HttpGet("protected")]
        [Authorize]
        public IActionResult GetProtectedData()
        {
            return Ok(new { message = "This is a protected API endpoint!" });
        }

        // פעולה פתוחה לכולם
        [HttpGet("public")]
        public IActionResult GetPublicData()
        {
            return Ok(new { message = "This is a public API endpoint." });
        }
    }
}