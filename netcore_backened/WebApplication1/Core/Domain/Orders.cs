using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebApplication1.Core.Domain
{
    [Table("ordenes")]
    public class Orders
    {
        [Key]
        [Column("id_usuario")]
        public int IdUser { get; set; }

        [Column("id_productos")]
        [Required]
        public int IdProducts { get; set; }

        [Column("cantidad")]
        [Required]
        public int Quantity { get; set; }
    }
} 