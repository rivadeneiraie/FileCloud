using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace FileCloud.Data.Context
{
    public class FileCloudDbContextFactory : IDesignTimeDbContextFactory<FileCloudDbContext>
    {
        public FileCloudDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<FileCloudDbContext>();
            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));

            return new FileCloudDbContext(optionsBuilder.Options);
        }
    }
}
