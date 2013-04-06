using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Webo_Front_sv5.Models
{
    public class Comment
    {

        [ScaffoldColumn(false)]
        public int Id { get; set; }
        [ScaffoldColumn(false)]
        public int VideoId { get; set; }
        [ScaffoldColumn(false)]
        public string User { get; set; }
        //[Required]
        public string CommentText { get; set; }
        private DateTime Created { get; set; }

        // Navigation properties
        //public virtual Video Video { get; set; }

    }
}