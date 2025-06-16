using Microsoft.EntityFrameworkCore;
using WebApplication1.Core.Domain;

namespace WebApplication1.Infrastructure.db
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Orders> Orders { get; set; }
    }
}
