using WebApplication1.Core.Domain;
using WebApplication1.Api.GraphQl.Types;
using System.Threading.Tasks;

namespace WebApplication1.Core.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<LoginType> Login(string name, string password);
    }
} 