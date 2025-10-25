using System;

using FileCloud.Domain;
namespace FileCloud.API.DTOs
{
    public class CloudFileSharedDto
    {
        public Guid Id { get; set; }
        public Guid FileId { get; set; }
        public string SharedWithUserId { get; set; } = string.Empty;
        public bool CanRead { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }

        public CloudFileSharedDto() { }

        public CloudFileSharedDto(CloudFileShared entity)
        {
            Id = entity.Id;
            FileId = entity.FileId;
            SharedWithUserId = entity.SharedWithUserId;
            CanRead = entity.CanRead;
            CanEdit = entity.CanEdit;
            CanDelete = entity.CanDelete;
        }

        public CloudFileShared ToEntity()
        {
            return new CloudFileShared
            {
                Id = this.Id,
                FileId = this.FileId,
                SharedWithUserId = this.SharedWithUserId,
                CanRead = this.CanRead,
                CanEdit = this.CanEdit,
                CanDelete = this.CanDelete
            };
        }
    }
}
