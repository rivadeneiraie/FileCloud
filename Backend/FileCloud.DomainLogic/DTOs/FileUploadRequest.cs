using Microsoft.AspNetCore.Http;
using FileCloud.Domain;

namespace FileCloud.DomainLogic.DTOs
{
    public class FileUploadRequest
    {
        public required IFormFile File { get; set; }
        public bool IsPublic { get; set; }

    }
}