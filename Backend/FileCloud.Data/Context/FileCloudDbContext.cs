using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FileCloud.Domain;

namespace FileCloud.Data.Context
{
    public class FileCloudDbContext : IdentityDbContext<IdentityUser>
    {
        public FileCloudDbContext(DbContextOptions<FileCloudDbContext> options)
            : base(options)
        {
        }

        public DbSet<CloudFile> Files { get; set; }
        public DbSet<CloudFileShared> SharedFiles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<ElmahError> ElmahErrors { get; set; }

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

            builder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(rt => rt.Id);
                entity.Property(rt => rt.Token).IsRequired();
                entity.Property(rt => rt.UserId).IsRequired();
                entity.Property(rt => rt.ExpiryDate).IsRequired();
                entity.Property(rt => rt.IsRevoked).IsRequired();
                entity.HasIndex(rt => rt.Token).IsUnique();
            });

            // Configuración de la tabla ELMAH_Error
            builder.Entity<ElmahError>(entity =>
            {
                entity.ToTable("ELMAH_Error");
                entity.HasKey(e => e.ErrorId);
                entity.Property(e => e.Application).IsRequired().HasMaxLength(60);
                entity.Property(e => e.Host).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Source).IsRequired().HasMaxLength(60);
                entity.Property(e => e.Message).IsRequired().HasMaxLength(500);
                entity.Property(e => e.User).IsRequired().HasMaxLength(50);
                entity.Property(e => e.StatusCode).IsRequired();
                entity.Property(e => e.TimeUtc).IsRequired();
                entity.Property(e => e.Sequence).ValueGeneratedOnAdd();
                entity.Property(e => e.AllXml).IsRequired();
                entity.HasIndex(e => new { e.Application, e.TimeUtc, e.Sequence })
                    .HasDatabaseName("IX_ELMAH_Error_App_Time_Seq");
            });
        }
    }
}
