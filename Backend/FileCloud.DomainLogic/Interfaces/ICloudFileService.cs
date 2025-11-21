using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileCloud.Domain;

namespace FileCloud.DomainLogic.Interfaces
{
    public interface ICloudFileService
    {
        Task<List<DTOs.CloudFilePublicDto>> GetAllPublicAsync();
        Task<List<DTOs.CloudFilePublicDto>> GetAllUserAsync();
    }
}
