using System;
using FileCloud.Domain;

namespace FileCloud.DomainLogic.DTOs
{
    public class CloudFilePublicDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public DateTime UploadDate { get; set; }
        public string UploadUser { get; set; }

        public CloudFilePublicDto(CloudFile file, string uploadUser)
        {
            Id = file.Id;
            FileName = file.FileName;
            UploadDate = file.UploadDate;
            UploadUser = uploadUser;
        }
    }
}
