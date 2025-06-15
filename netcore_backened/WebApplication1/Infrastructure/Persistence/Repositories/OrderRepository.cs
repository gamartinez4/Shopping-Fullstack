using Microsoft.EntityFrameworkCore;
using WebApplication1.Core.Application.Interfaces;
using WebApplication1.Core.Domain;
using WebApplication1.Infrastructure.db;

namespace WebApplication1.Infrastructure.Persistence.Repositories
{
    public class OrderRepository : IOrdersRepository
    {
        private readonly ApplicationDbContext _contextdb;
        public OrderRepository(ApplicationDbContext contextdb)
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