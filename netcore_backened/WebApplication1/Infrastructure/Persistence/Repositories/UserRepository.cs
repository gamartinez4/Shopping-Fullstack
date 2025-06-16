using Microsoft.EntityFrameworkCore;
using WebApplication1.Core.Application.Interfaces;
using WebApplication1.Core.Domain;
using WebApplication1.Api.GraphQl.Types;
using WebApplication1.Infrastructure.db;

namespace WebApplication1.Infrastructure.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _contextdb;
        public UserRepository(ApplicationDbContext contextdb)
        {
            _contextdb = contextdb;
        }
        public async Task<LoginType> Login(string name, string password)
        {
            Users user = await _contextdb.Users.FirstOrDefaultAsync(u => u.Name == name && u.Password == password);

            if (user != null)
            {
                return new LoginType() { IdUser = user.Id, Token = user.Token };
            }

            return new LoginType() { };
        }
    }
} 