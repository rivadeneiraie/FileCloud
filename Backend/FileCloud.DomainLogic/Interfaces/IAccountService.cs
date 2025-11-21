using System.Threading.Tasks;
using FileCloud.DomainLogic.DTOs;
using Microsoft.AspNetCore.Identity;

namespace FileCloud.DomainLogic.Interfaces
{
    public interface IAccountService
    {
        Task<(string AccessToken, string RefreshToken)> LoginAsync(string email, string password);
        Task<(string AccessToken, string RefreshToken)> RefreshTokenAsync(string refreshToken);
    }
}
