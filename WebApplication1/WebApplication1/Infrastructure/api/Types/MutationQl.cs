using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.db;
using WebApplication1.Models;
using WebApplication1.Repository;

namespace WebApplication1.Infrastructure.api.Types
{
    public class MutationQl
    {
        public async Task<string> UpdateOrderQuantity([Service] OrdersRepository ordersRepository, List<Orders> orders)
        {
            try
            {
                await ordersRepository.UpdateOrderQuantity(orders);
                return "Update exitoso";
            }catch (Exception ex)
            {;
                return "Error de update";
            }
           
        }

        public async Task<string> DiscountStockByOrder([Service] ProductsRepository productsRepository, List<Orders> orders)
        {
            try
            {
                await productsRepository.DiscountStockByOrder(orders);
                return "Update exitoso";
            }
            catch (Exception ex)
            {
                ;
                return "Error de update";
            }

        }
    }
}
