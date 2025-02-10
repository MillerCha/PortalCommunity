using CoursesService.Interfaces;
using Models;

namespace CoursesService.Services
{
    public class CourseService: ICourseService
    {
        private List<Course> _courses;

        public CourseService()
        {
              _courses = new List<Course> {
               
            };   
        }

        List<Course> ICourseService.GeatAllCourses()
        {
            return _courses;
        }
        
        Course ICourseService.GeatCourse(int id)
        {
            return _courses.FirstOrDefault();
        }
    }
}
