using System.Security.Claims;

namespace FileCloud.DomainLogic.Interfaces
{
    public interface IUserService
    {
        ClaimsPrincipal GetCurrentUser();
    }
}