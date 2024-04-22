using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebApplication1.Infrastructure.api.Types;
using WebApplication1.Infrastructure.db;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _contextdb;
        public UserRepository(ApplicationDbContext contextdb)
        {
            _contextdb = contextdb;
        }
        public async Task<LoginType> Login(String name, String password)
        {
            Users user = await _contextdb.Users.FirstOrDefaultAsync(u => u.Name == name && u.Password == password);

            if (user != null)
            {
                return new LoginType() { IdUser = user.Id , Token = user.Token};
            }

            return new LoginType() {};

        }
    }
}
