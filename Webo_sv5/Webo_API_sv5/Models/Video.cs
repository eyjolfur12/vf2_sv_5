using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Webo_API_sv5.Models
{
    public class Video
    {

        [ScaffoldColumn(false)]
        public int Id { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Link { get; set; }
        public string Description { get; set; }
        private DateTime Created { get; set; }

        // Navigation properties
        public Course Course { get; set; }
    }
}