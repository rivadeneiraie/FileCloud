using FileCloud.Data;
using FileCloud.Domain;
using FileCloud.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FileCloud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SharedFilesController : ControllerBase
    {
        private readonly FileCloud.DomainLogic.Interfaces.IService<CloudFileShared> _sharedFileService;
        public SharedFilesController(FileCloud.DomainLogic.Interfaces.IService<CloudFileShared> sharedFileService)
        {
            _sharedFileService = sharedFileService;
        }

        // GET: api/sharedfiles
        [HttpGet]
        public async Task<IActionResult> GetSharedFiles()
        {
            var sharedFiles = await _sharedFileService.GetAllAsync();
            var dtos = sharedFiles.Select(sf => new CloudFileSharedDto(sf));
            return Ok(dtos);
        }

        // GET: api/sharedfiles/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSharedFile(Guid id)
        {
            var sharedFile = await _sharedFileService.GetByIdAsync(id);
            if (sharedFile == null) return NotFound();
            var dto = new CloudFileSharedDto(sharedFile);
            return Ok(dto);
        }

        // POST: api/sharedfiles
        [HttpPost]
        public async Task<IActionResult> CreateSharedFile([FromBody] CloudFileSharedDto dto)
        {
            var created = await _sharedFileService.CreateAsync(dto.ToEntity());
            var resultDto = new CloudFileSharedDto(created);
            return CreatedAtAction(nameof(GetSharedFile), new { id = resultDto.Id }, resultDto);
        }

        // PUT: api/sharedfiles/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSharedFile(Guid id, [FromBody] CloudFileSharedDto dto)
        {
            if (id != dto.Id) return BadRequest();
            await _sharedFileService.UpdateAsync(dto.ToEntity());
            return NoContent();
        }

        // DELETE: api/sharedfiles/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSharedFile(Guid id)
        {
            var deleted = await _sharedFileService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
