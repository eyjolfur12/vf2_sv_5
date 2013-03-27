using System.Data.Entity;

namespace Webo_API_sv5.Models
{
    public class Webo_API_sv5Context : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<Webo_API_sv5.Models.Webo_API_sv5Context>());

        public Webo_API_sv5Context() : base("name=Webo_API_sv5Context")
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
