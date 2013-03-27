using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Webo_API_sv5.Models
{
    public class ContextInitializer : DropCreateDatabaseIfModelChanges<Webo_API_sv5Context>
    {

        protected override void Seed(Webo_API_sv5Context context)
        {
            var courses = new List<Course>()            
            {
                new Course() { Name = "First course", Teacher = 1 },
            };

            courses.ForEach(p => context.Courses.Add(p));
            context.SaveChanges();

            var videos = new List<Video>()
            {
                new Video() { Name = "First lecture", Link= "http://youtu.be/5ydD7H9Okns",Course = courses[0], Description = "Great lecture by Daniel Brandur"},
                new Video() { Name = "Second lecture", Link= "http://www.youtube.com/watch?v=pwOpvNfmjaY", Course = courses[0], Description = "Another great lecture by Daniel Brandur"},
            };
            videos.ForEach(o => context.Videos.Add(o));
            context.SaveChanges();

            var comments = new List<Comment>()
            {
                new Comment() { CommentText = "Wow, what a great lecture !", Video = videos[0], UserId = 1},
                new Comment() { CommentText = "I totally agree !", Video = videos[0], UserId = 2},
            };
            comments.ForEach(o => context.Comments.Add(o));
            context.SaveChanges();

        }
    }
}