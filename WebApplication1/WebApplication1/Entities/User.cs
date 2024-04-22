using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    [Table("usuarios")]
    public class Users
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("contraseña")]
        [Required]
        [StringLength(50)]
        public string Password { get; set; }

        [Column("token")]
        [Required]
        [StringLength(50)]
        public string Token { get; set; }
    }
}
