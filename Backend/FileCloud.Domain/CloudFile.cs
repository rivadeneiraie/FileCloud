using System;

namespace FileCloud.Domain
{
    public class CloudFile
    {
        public Guid Id { get; set; }
        public required string FileName { get; set; }
        public required string Path { get; set; }
        public required string Hash { get; set; }
        public DateTime UploadDate { get; set; }
        public required string UserId { get; set; } // FK to AspNetUsers
        public bool IsPublic { get; set; }
    }
}
