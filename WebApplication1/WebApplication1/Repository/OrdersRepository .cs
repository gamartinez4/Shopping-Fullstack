using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;
using WebApplication1.Infrastructure.db;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
    public class OrdersRepository
    {
        private readonly ApplicationDbContext _contextdb;
        public OrdersRepository(ApplicationDbContext contextdb)
        {
            _contextdb = contextdb;
        }
        public async Task<IEnumerable<Orders>> AllListOfProducts()
        {
            return await _contextdb.Orders.ToListAsync();

        }

        public async Task UpdateOrderQuantity(List<Orders> orders) 
        {
            foreach (var incomingOrder in orders)
             {
                var existingOrder = _contextdb.Orders
                    .FirstOrDefault(o => o.IdUser == incomingOrder.IdUser && o.IdProducts == incomingOrder.IdProducts);

                if (existingOrder != null)
                {
                    existingOrder.Quantity += incomingOrder.Quantity;
                }
                else
                {
                    
                    _contextdb.Orders.Add(incomingOrder);
                }
            }

            await _contextdb.SaveChangesAsync();
        }
    }
}
