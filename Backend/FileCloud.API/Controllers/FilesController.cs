using FileCloud.Data;
using FileCloud.Domain;
using FileCloud.API.DTOs;
using FileCloud.DomainLogic.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace FileCloud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FilesController : ControllerBase
    {
        private readonly FileCloud.DomainLogic.Interfaces.IService<CloudFile> _cloudFileService;
        private readonly FileCloud.DomainLogic.Interfaces.IFileBusinessLogic _fileBusinessLogic;
        private readonly Microsoft.Extensions.Localization.IStringLocalizer<FileCloud.DomainLogic.Resources.Resources> _localizer;
        private readonly FileCloud.DomainLogic.Interfaces.ICloudFileService _cloudFilePublicService;
        public FilesController(FileCloud.DomainLogic.Interfaces.IService<CloudFile> cloudFileService,
            FileCloud.DomainLogic.Interfaces.IFileBusinessLogic fileBusinessLogic,
            Microsoft.Extensions.Localization.IStringLocalizer<FileCloud.DomainLogic.Resources.Resources> localizer,
            FileCloud.DomainLogic.Interfaces.ICloudFileService cloudFilePublicService)
        {
            _cloudFileService = cloudFileService;
            _fileBusinessLogic = fileBusinessLogic;
            _localizer = localizer;
            _cloudFilePublicService = cloudFilePublicService;
        }

        // GET: api/files
        [HttpGet]
        public async Task<IActionResult> GetFiles()
        {
            var files = await _cloudFileService.GetAllAsync();
            var dtos = files.Select(f => new CloudFileDto(f));
            return Ok(dtos);
        }

        // GET: api/files/public
        [HttpGet("public")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublicFiles()
        {
            var dtos = await _cloudFilePublicService.GetAllPublicAsync();
            return Ok(dtos);
        }

        // GET: api/files/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(Guid id)
        {
            var file = await _cloudFileService.GetByIdAsync(id);
            if (file == null) return NotFound();
            var dto = new CloudFileDto(file);
            return Ok(dto);
        }

        // GET: api/files/download/{id}
        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(Guid id)
        {
            var file = await _cloudFileService.GetByIdAsync(id);
            if (file == null)
            {
                return NotFound();
            }

            var filePath = file.Path;
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(_localizer["FileNotFoundOnServer"]);
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, "application/octet-stream", file.FileName);
        }

        // POST: api/files
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateFile([FromForm] FileUploadRequest request)
        {
            var created = await _fileBusinessLogic.UploadFileAsync(request);
            var resultDto = new CloudFileDto(created);
            return CreatedAtAction(nameof(GetFile), new { id = resultDto.Id }, resultDto);
        }

        // PUT: api/files/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(Guid id, [FromBody] CloudFileDto dto)
        {
            if (id != dto.Id) return BadRequest();
            await _cloudFileService.UpdateAsync(dto.ToEntity());
            return NoContent();
        }

        // DELETE: api/files/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(Guid id)
        {
            var deleted = await _cloudFileService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
