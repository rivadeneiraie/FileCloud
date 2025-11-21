using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using FileCloud.Domain.Constants;

namespace FileCloud.Data.Seeds
{
    public static class IdentitySeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var roles = new[] {
                RoleConstants.AdminUserCreate,
                RoleConstants.AdminUserUpdate,
                RoleConstants.AdminUserDelete,
                RoleConstants.UserFileUpload,
                RoleConstants.UserFileDownload,
                RoleConstants.UserFileDelete,
                RoleConstants.UserSharedFileCreate,
                RoleConstants.UserSharedFileRevoke
            };
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var adminEmail = "admin@filecloud.local";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new IdentityUser
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true
                };
                var result = await userManager.CreateAsync(adminUser, "Admin123!");
                if (result.Succeeded)
                {
                    foreach (var role in roles)
                    {
                        await userManager.AddToRoleAsync(adminUser, role);
                    }
                }
            }
        }
    }
}
