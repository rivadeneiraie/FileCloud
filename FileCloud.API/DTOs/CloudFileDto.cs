using System;

using FileCloud.Domain;
namespace FileCloud.API.DTOs
{
    public class CloudFileDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public string Hash { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; }
        public string UserId { get; set; } = string.Empty;
        
        public CloudFileDto() { }
        
        public CloudFileDto(CloudFile entity)
        {
            Id = entity.Id;
            FileName = entity.FileName;
            Path = entity.Path;
            Hash = entity.Hash;
            UploadDate = entity.UploadDate;
            UserId = entity.UserId;
        }

        public CloudFile ToEntity()
        {
            return new CloudFile
            {
                Id = this.Id,
                FileName = this.FileName,
                Path = this.Path,
                Hash = this.Hash,
                UploadDate = this.UploadDate,
                UserId = this.UserId
            };
        }
    }
}
