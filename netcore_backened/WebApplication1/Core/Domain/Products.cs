using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Core.Domain
{
    [Table("productos")]
    public class Products
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Column("nombre")]
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("stock")]
        public int? Stock { get; set; }

        [Column("precio")]
        public int Price { get; set; }

        [Column("id_categorias")]
        public int IdCategories { get; set; }
    }
} 