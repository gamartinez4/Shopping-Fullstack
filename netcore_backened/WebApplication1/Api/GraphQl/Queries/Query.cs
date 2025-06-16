using WebApplication1.Core.Application.Interfaces;
using WebApplication1.Core.Domain;
using WebApplication1.Api.GraphQl.Types;
using WebApplication1.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Api.GraphQl.Queries
{
    public class Query
    {
        public async Task<LoginType> GetLogin(
            [Service] IUserRepository userRepository,
            [GlobalState] string? auth,
            string username,
            string password)
        {
            LoginType loginType = await userRepository.Login(username, password);
            TokenValidator.Token = loginType.Token;
            return loginType;
        }

        public async Task<IEnumerable<Products>> GetAllListOfProducts(
            [Service] IProductsRepository productsRepository,
            [GlobalState] string? auth)
        {
            return await productsRepository.AllListOfProducts();
        }
    }
} 