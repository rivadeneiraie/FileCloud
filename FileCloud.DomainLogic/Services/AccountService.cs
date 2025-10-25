using System;
using System.Threading.Tasks;
using FileCloud.DomainLogic.DTOs;
using FileCloud.Domain;
using FileCloud.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FileCloud.DomainLogic.Helpers;
using FileCloud.DomainLogic.Interfaces;

namespace FileCloud.DomainLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IService<RefreshToken> _refreshTokenService;

        public AccountService(UserManager<IdentityUser> userManager, IConfiguration configuration, IService<RefreshToken> refreshTokenService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<(string AccessToken, string RefreshToken)> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
                throw new UnauthorizedAccessException("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);
            var token = JwtHelper.GenerateToken(user, roles, _configuration);
            var refreshTokenValue = JwtHelper.GenerateRefreshToken();
            var refreshToken = new RefreshToken
            {
                Token = refreshTokenValue,
                UserId = user.Id,
                ExpiryDate = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpirationDays"] ?? "7")),
                IsRevoked = false
            };
            await _refreshTokenService.CreateAsync(refreshToken);
            return (token, refreshTokenValue);
        }

        public async Task<(string AccessToken, string RefreshToken)> RefreshTokenAsync(string refreshTokenValue)
        {
            var allTokens = await _refreshTokenService.GetAllAsync();
            var storedToken = allTokens.FirstOrDefault(rt => rt.Token == refreshTokenValue);
            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiryDate < DateTime.UtcNow)
                throw new UnauthorizedAccessException("Invalid or expired refresh token");

            var user = await _userManager.FindByIdAsync(storedToken.UserId);
            if (user == null)
                throw new UnauthorizedAccessException("User not found");

            var roles = await _userManager.GetRolesAsync(user);
            var newAccessToken = JwtHelper.GenerateToken(user, roles, _configuration);
            storedToken.IsRevoked = true;
            var newRefreshTokenValue = JwtHelper.GenerateRefreshToken();
            var newRefreshToken = new RefreshToken
            {
                Token = newRefreshTokenValue,
                UserId = user.Id,
                ExpiryDate = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpirationDays"] ?? "7")),
                IsRevoked = false
            };
            await _refreshTokenService.CreateAsync(newRefreshToken);
            return (newAccessToken, newRefreshTokenValue);
        }
    }
}
