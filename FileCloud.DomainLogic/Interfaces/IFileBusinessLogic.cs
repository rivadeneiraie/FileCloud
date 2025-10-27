using FileCloud.Domain;
using FileCloud.DomainLogic.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FileCloud.DomainLogic.Interfaces
{
    public interface IFileBusinessLogic
    {
        Task<CloudFile> UploadFileAsync(FileUploadRequest request);
    }
}