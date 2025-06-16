using WebApplication1.Core.Application.Interfaces;
using WebApplication1.Core.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace WebApplication1.Api.GraphQl.Mutations
{
    public class Mutation
    {
        public async Task<string> UpdateOrderQuantity([Service] IOrdersRepository ordersRepository, List<Orders> orders)
        {
            try
            {
                await ordersRepository.UpdateOrderQuantity(orders);
                return "Update exitoso";
            }
            catch (Exception ex)
            {
                return "Error de update";
            }
        }

        public async Task<string> DiscountStockByOrder([Service] IProductsRepository productsRepository, List<Orders> orders)
        {
            try
            {
                await productsRepository.DiscountStockByOrder(orders);
                return "Update exitoso";
            }
            catch (Exception ex)
            {
                return "Error de update";
            }
        }
    }
} 