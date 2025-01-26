using AuthService.Services;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IConfiguration configuration, IAuthenticationService AuthenticationService)
        {
            _configuration = configuration;
            _authenticationService = AuthenticationService;
        }

        [HttpGet]
        public IActionResult Get(string username)
        {

            string tokenString = _authenticationService.Auth(username);
            
            if (tokenString == null)
            {
                return BadRequest("Username is required");
            }

            return Ok(new { Token = tokenString });

        }


        [HttpGet("GetKey")]
        public IActionResult GetKey()
        {
            RSA rsa = RSA.Create(2048);
            var privateKey = rsa.ExportRSAPrivateKey();
            var publicKey = rsa.ExportRSAPublicKey();

            return Ok(new
            {
                privateKey = Convert.ToBase64String(privateKey),
                publicKey = Convert.ToBase64String(publicKey),
                privateKe2y = privateKey,
                publicKey2 = publicKey
            });


        }


    }
}
