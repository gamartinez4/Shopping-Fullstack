using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;
using WebApplication1.Models;

namespace WebApplication1.Infrastructure.db
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }

        public DbSet<Orders> Orders { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orders>()
            .HasKey(o => new { o.IdUser, o.IdProducts});
        }

      
    }
}
