using WebApplication1.Core.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Core.Application.Interfaces
{
    public interface IProductsRepository
    {
        Task<IEnumerable<Products>> AllListOfProducts();
        Task DiscountStockByOrder(List<Orders> orders);
    }
} 