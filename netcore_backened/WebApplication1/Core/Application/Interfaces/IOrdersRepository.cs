using WebApplication1.Core.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Core.Application.Interfaces
{
    public interface IOrdersRepository
    {
        Task<IEnumerable<Orders>> AllListOfProducts();
        Task UpdateOrderQuantity(List<Orders> orders);
    }
} 