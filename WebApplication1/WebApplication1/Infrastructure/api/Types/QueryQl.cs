using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.api.Types;
using WebApplication1.Utils;
using WebApplication1.Models;
using WebApplication1.Repository;
using WebApplication1.Entities;

namespace WebApplication1.Infrastructure.api
{
    public class QueryQl
    {
        public async Task<LoginType> GetLogin(
            [Service] UserRepository userRepository,
            [GlobalState] String? auth, 
            string username, 
            string password
            )
        {

            LoginType loginType = await userRepository.Login(username, password);
            TokenValidator.Token = loginType.Token;
            return loginType;
        }

        public async Task<IEnumerable<Products>> GetAllListOfProducts(
            [Service] ProductsRepository productsRepository,
            [GlobalState] String? auth
            )
        {
            return await productsRepository.AllListOfProducts();
        }
    }
}
