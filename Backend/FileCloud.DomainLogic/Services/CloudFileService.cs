using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileCloud.Domain;
using FileCloud.DomainLogic.Interfaces;

namespace FileCloud.DomainLogic.Services
{
    public class CloudFileService : ICloudFileService
    {
        private readonly IService<CloudFile> _service;
        private readonly Microsoft.AspNetCore.Identity.UserManager<Microsoft.AspNetCore.Identity.IdentityUser> _userManager;
        private readonly IUserService _userService;

        public CloudFileService(
            IService<CloudFile> service,
            Microsoft.AspNetCore.Identity.UserManager<Microsoft.AspNetCore.Identity.IdentityUser> userManager,
            IUserService userService)
        {
            _service = service;
            _userManager = userManager;
            _userService = userService;
        }

        public async Task<List<DTOs.CloudFilePublicDto>> GetAllPublicAsync()
        {
            var allFiles = await _service.GetAllAsync();
            var publicFiles = allFiles.Where(f => f.IsPublic).ToList();
            var dtos = new List<DTOs.CloudFilePublicDto>();
            foreach (var file in publicFiles)
            {
                var user = await _userManager.FindByIdAsync(file.UserId);
                var userName = user?.UserName ?? "Unknown";
                dtos.Add(new DTOs.CloudFilePublicDto(file, userName));
            }
            return dtos;
        }

        public async Task<List<DTOs.CloudFilePublicDto>> GetAllUserAsync()
        {
            var currentUser = _userService.GetCurrentUser();
            var userId = _userManager.GetUserId(currentUser);
            if (string.IsNullOrEmpty(userId))
            {
                return new List<DTOs.CloudFilePublicDto>();
            }
            var allFiles = await _service.GetAllAsync();
            var userFiles = allFiles.Where(f => f.UserId == userId).ToList();
            var dtos = new List<DTOs.CloudFilePublicDto>();
            var user = await _userManager.FindByIdAsync(userId);
            var userName = user?.UserName ?? "Unknown";
            foreach (var file in userFiles)
            {
                dtos.Add(new DTOs.CloudFilePublicDto(file, userName));
            }
            return dtos;
        }
    }
}
