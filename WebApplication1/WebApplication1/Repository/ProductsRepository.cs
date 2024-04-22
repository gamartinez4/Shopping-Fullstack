using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;
using WebApplication1.Infrastructure.db;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
    public class ProductsRepository
    {
        private readonly ApplicationDbContext _contextdb;
        public ProductsRepository(ApplicationDbContext contextdb)
        {
            _contextdb = contextdb;
        }
        public async Task<IEnumerable<Products>> AllListOfProducts()
        {
            return await _contextdb.Products.ToListAsync();

        }

        public async Task DiscountStockByOrder(List<Orders> orders)
        {
            foreach (var order in orders)
            {
                var product = await _contextdb.Products.FirstOrDefaultAsync(p => p.Id == order.IdProducts);
                if (product == null)
                {
                    throw new Exception("Producto no encontrado");
                }

                if (product.Stock >= order.Quantity)
                {
                    product.Stock -= order.Quantity;
                }
           
            }
            await _contextdb.SaveChangesAsync();
        }

    }
}
