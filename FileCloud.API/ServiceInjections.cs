using Microsoft.Extensions.DependencyInjection;
using FileCloud.DomainLogic.Interfaces;
using FileCloud.DomainLogic.Services;
using Microsoft.EntityFrameworkCore;

namespace FileCloud.API
{
    public static class ServiceInjections
    {
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IService<>), typeof(Service<>));
            return services;
        }

        public static IServiceCollection AddDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FileCloud.Data.FileCloudDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentityCore<Microsoft.AspNetCore.Identity.IdentityUser>()
                .AddEntityFrameworkStores<FileCloud.Data.FileCloudDbContext>();
            return services;
        }
    }
}
