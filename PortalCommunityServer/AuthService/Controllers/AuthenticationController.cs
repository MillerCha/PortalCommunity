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
        /// <summary>
        /// private readonly RsaSecurityKey _signingKey;
        /// </summary>
        private readonly IConfiguration _configuration;

        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get(string username)
        {


            var jwtSettings = _configuration.GetSection("JwtSettings");
            var privateKeyString = jwtSettings["PrivateKey"].ToString();
            byte[] privateKeyBytes = Convert.FromBase64String(privateKeyString);

            var rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKeyBytes, out _);

            var signingCredentials = new SigningCredentials(new RsaSecurityKey(rsa), SecurityAlgorithms.RsaSha256);

            // var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            //var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            if (string.IsNullOrEmpty(username))
                return BadRequest("Username is required");

            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, username)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(300),
                signingCredentials: signingCredentials);

            return Ok(new JwtSecurityTokenHandler().WriteToken(token));

        }


        [HttpGet("GetKey")]
        public IActionResult GetKey()
        {
            RSA rsa = RSA.Create(2048);
            var privateKey = rsa.ExportRSAPrivateKey();
            var publicKey = rsa.ExportRSAPublicKey();

            return Ok(new { privateKey = Convert.ToBase64String(privateKey), publicKey = Convert.ToBase64String(publicKey),
                privateKe2y = privateKey,
                publicKey2 = publicKey
            });


        }

       
    }
}
