using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebMatrix.WebData;
using System.Web.Security;

namespace Webo_Front_sv5.Models
{
    //public class ContextInitializer : DropCreateDatabaseIfModelChanges<Webo_Front_sv5Context>
    public class ContextInitializer : DropCreateDatabaseAlways<Webo_Front_sv5Context>
    {

        protected override void Seed(Webo_Front_sv5Context context)
        {
            var courses = new List<Course>()            
            {
                new Course() { Name = "First course", Teacher = 1 },
            };

            courses.ForEach(p => context.Courses.Add(p));
            context.SaveChanges();

            var videos = new List<Video>()
            {
                new Video() { Name = "First lecture", Link= "5ydD7H9Okns",CourseId = courses[0].Id, Description = "Great lecture by Daniel Brandur"},
                new Video() { Name = "Second lecture", Link= "pwOpvNfmjaY", CourseId = courses[0].Id, Description = "Another great lecture by Daniel Brandur"},
            };
            videos.ForEach(o => context.Videos.Add(o));
            context.SaveChanges();

            var comments = new List<Comment>()
            {
                new Comment() { CommentText = "Wow, what a great lecture !", VideoId = videos[0].Id, UserId = 1},
                new Comment() { CommentText = "I totally agree !", VideoId = videos[0].Id, UserId = 2},
            };
            comments.ForEach(o => context.Comments.Add(o));
            context.SaveChanges();

            WebSecurity.InitializeDatabaseConnection("DefaultConnection",
            "UserProfile", "UserId", "UserName", autoCreateTables: true);
            var roles = (SimpleRoleProvider)Roles.Provider;
            var membership = (SimpleMembershipProvider)Membership.Provider;

            if (!roles.RoleExists("Admin"))
            {
                roles.CreateRole("Admin");
            }
            if (!roles.RoleExists("Teacher"))
            {
                roles.CreateRole("Teacher");
            }
            if (membership.GetUser("test", false) == null)
            {
                membership.CreateUserAndAccount("test", "test");
            }
            if (membership.GetUser("dabs", false) == null)
            {
                membership.CreateUserAndAccount("dabs", "smuu"); 
            }
            if (!roles.GetRolesForUser("test").Contains("Admin"))
            {
                roles.AddUsersToRoles(new[] { "test" }, new[] { "admin" });
            }
            if (!roles.GetRolesForUser("dabs").Contains("Teacher"))
            {
                roles.AddUsersToRoles(new[] { "dabs" }, new[] { "Teacher" });
            }
 

        }
    }
}