using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Webo_API_sv5.Models;

namespace Webo_API_sv5.Controllers
{
    public class CourseController : ApiController
    {
        private Webo_API_sv5Context db = new Webo_API_sv5Context();

        // GET api/Course
        public IEnumerable<Course> GetCourses()
        {
            return db.Courses.AsEnumerable();
        }

        // GET api/Course/5
        public Course GetCourse(int id)
        {
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return course;
        }

        // PUT api/Course/5
        public HttpResponseMessage PutCourse(int id, Course course)
        {
            if (ModelState.IsValid && id == course.Id)
            {
                db.Entry(course).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Course
        public HttpResponseMessage PostCourse(Course course)
        {
            if (ModelState.IsValid)
            {
                db.Courses.Add(course);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, course);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = course.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Course/5
        public HttpResponseMessage DeleteCourse(int id)
        {
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Courses.Remove(course);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, course);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}