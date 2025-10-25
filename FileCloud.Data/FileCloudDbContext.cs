using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FileCloud.Domain;

namespace FileCloud.Data
{
    public class FileCloudDbContext : IdentityDbContext<IdentityUser>
    {
        public FileCloudDbContext(DbContextOptions<FileCloudDbContext> options)
            : base(options)
        {
        }

    public DbSet<CloudFile> Files { get; set; }
    public DbSet<CloudFileShared> SharedFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CloudFile>(entity =>
            {
                entity.HasKey(f => f.Id);
                entity.Property(f => f.FileName).IsRequired().HasMaxLength(255);
                entity.Property(f => f.Path).IsRequired();
                entity.Property(f => f.Hash).IsRequired().HasMaxLength(128);
                entity.Property(f => f.UploadDate).IsRequired();
            entity.HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            });

        builder.Entity<CloudFileShared>(entity =>
        {
            entity.HasKey(sf => sf.Id);
            entity.HasOne<CloudFile>()
                .WithMany()
                .HasForeignKey(sf => sf.FileId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(sf => sf.SharedWithUserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        }
    }
}
