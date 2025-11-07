using FileCloud.Domain;
using FileCloud.DomainLogic.Interfaces;
using FileCloud.DomainLogic.DTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;
using FileCloud.DomainLogic.Services;

namespace FileCloud.DomainLogic.BusinessLogic
{
    public class FileBusinessLogic : IFileBusinessLogic
    {
        private readonly DomainLogic.Interfaces.IService<CloudFile> _cloudFileService;
        private readonly IUserService _userService;
        private readonly Microsoft.Extensions.Localization.IStringLocalizer<FileCloud.DomainLogic.Resources.Resources> _localizer;

        public FileBusinessLogic(DomainLogic.Interfaces.IService<CloudFile> cloudFileService, IUserService userService,
            Microsoft.Extensions.Localization.IStringLocalizer<FileCloud.DomainLogic.Resources.Resources> localizer)
        {
            _cloudFileService = cloudFileService;
            _userService = userService;
            _localizer = localizer;
        }

        private string GenerateFilePath(string fileName)
        {
            var yearMonthFolder = DateTime.UtcNow.ToString("yyyyMM");
            var fullPath = Path.Combine("Uploads", yearMonthFolder, fileName);


            var directory = Path.GetDirectoryName(fullPath);
            if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            return fullPath;
        }

        public async Task<CloudFile> UploadFileAsync(FileUploadRequest request)
        {
            // Implementación del método para cumplir con la interfaz
            var filePath = GenerateFilePath(request.File.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }

            // Generar el hash del archivo
            string fileHash;
            using (var hashStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            using (var sha256 = SHA256.Create())
            {
                var hashBytes = sha256.ComputeHash(hashStream);
                fileHash = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
            }

            // Obtener el usuario logueado
            var currentUser = _userService.GetCurrentUser();
            var userId = currentUser?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                throw new InvalidOperationException(_localizer["UserIdCannotBeNullOrEmpty"]);
            }

            // Crear una nueva instancia de CloudFile y setear los valores
            var cloudFile = new CloudFile
            {
                Id = Guid.NewGuid(),
                FileName = request.File.FileName,
                Path = filePath,
                Hash = fileHash, // Asignar el hash generado
                UploadDate = DateTime.UtcNow,
                UserId = userId // Usar el ID del usuario logueado
            };

            // Insertar el archivo en la base de datos
            var createdFile = await _cloudFileService.CreateAsync(cloudFile);
            return createdFile;
        }
    }
}