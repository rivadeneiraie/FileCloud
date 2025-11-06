using FileCloud.Data.Context;
using Microsoft.Extensions.DependencyInjection;
using FileCloud.DomainLogic.Interfaces;
using FileCloud.DomainLogic.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FileCloud.DomainLogic.BusinessLogic;

namespace FileCloud.API
{
        public static class ServiceInjections
        {
            /// <summary>
            /// Agrega y configura los servicios de localización apuntando a los archivos de recursos en FileCloud.DomainLogic/Resources.
            /// </summary>
            public static IServiceCollection AddTranslateServices(this IServiceCollection services)
            {
                services.AddLocalization();
                return services;
            }

            public static IServiceCollection AddDomainServices(this IServiceCollection services)
            {
                services.AddScoped(typeof(IService<>), typeof(Service<>));
                services.AddScoped<IAccountService, AccountService>();
                services.AddScoped<IUserService, UserService>();
                return services;
            }

            public static IServiceCollection AddDataServices(this IServiceCollection services, IConfiguration configuration)
            {
                services.AddDbContext<FileCloud.Data.Context.FileCloudDbContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
                services.AddIdentity<Microsoft.AspNetCore.Identity.IdentityUser, Microsoft.AspNetCore.Identity.IdentityRole>()
                    .AddEntityFrameworkStores<FileCloud.Data.Context.FileCloudDbContext>()
                    .AddDefaultTokenProviders();
                return services;
            }

            public static IServiceCollection AddBusinessLogicServices(this IServiceCollection services)
            {
                services.AddScoped<IFileBusinessLogic, FileBusinessLogic>();
                // Agregar otros servicios de lógica de negocio aquí
                return services;
            }
        }
}
