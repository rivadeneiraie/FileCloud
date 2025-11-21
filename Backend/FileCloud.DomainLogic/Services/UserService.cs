using System.Security.Claims;
using FileCloud.DomainLogic.Interfaces;
using Microsoft.AspNetCore.Http;

namespace FileCloud.DomainLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public ClaimsPrincipal GetCurrentUser()
        {
            return _httpContextAccessor.HttpContext?.User ?? new ClaimsPrincipal();
        }
    }
}