using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Webo_API_sv5.Models
{


    public class Course
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Teacher { get; set; }

        // Navigation property
        public ICollection<Comment> Comments { get; set; }

    }
}