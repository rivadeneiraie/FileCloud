using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using FileCloud.DomainLogic.DTOs;
using FileCloud.DomainLogic.Interfaces;

namespace FileCloud.API.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
        public class AccountController : ControllerBase
        {
            private readonly IAccountService _accountService;

            public AccountController(IAccountService accountService)
            {
                _accountService = accountService;
            }

            [HttpPost("login")]
            public async Task<IActionResult> Login([FromBody] FileCloud.DomainLogic.DTOs.LoginRequest model)
            {
                try
                {
                    var result = await _accountService.LoginAsync(model.Email, model.Password);
                    return Ok(new
                    {
                        AccessToken = result.AccessToken,
                        RefreshToken = result.RefreshToken
                    });
                }
                catch (UnauthorizedAccessException ex)
                {
                    return Unauthorized(ex.Message);
                }
            }

            [HttpPost("refresh")]
            public async Task<IActionResult> Refresh([FromBody] FileCloud.DomainLogic.DTOs.RefreshTokenRequest model)
            {
                try
                {
                    var result = await _accountService.RefreshTokenAsync(model.RefreshToken);
                    return Ok(new
                    {
                        AccessToken = result.AccessToken,
                        RefreshToken = result.RefreshToken
                    });
                }
                catch (UnauthorizedAccessException ex)
                {
                    return Unauthorized(ex.Message);
                }
            }
        }

}
