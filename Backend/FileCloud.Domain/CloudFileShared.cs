using System;

namespace FileCloud.Domain
{
    public class CloudFileShared
    {
        public Guid Id { get; set; }
        public Guid FileId { get; set; } // FK to CloudFile
        public required string SharedWithUserId { get; set; } // FK to AspNetUsers
        public bool CanRead { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
    }
}
