using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FileCloud.DomainLogic.Interfaces
{
    public interface IService<T> where T : class
    {
        Task<T> CreateAsync(T entity);
        Task<T?> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> UpdateAsync(T entity);
        Task<bool> DeleteAsync(Guid id);
    }
}
