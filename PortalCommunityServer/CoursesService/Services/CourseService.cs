using CoursesService.Interfaces;
using CoursesService.Model;

namespace CoursesService.Services
{
    public class CourseService: ICourseService
    {
        private List<Course> _courses;

        public CourseService()
        {
              _courses = new List<Course> {
                new Course{ Id=1, Name="שחיה"},
                new Course{ Id=2, Name="אומנות"},
                new Course { Id = 3, Name = "שחמט" },
                new Course { Id = 4, Name = "אלקטרוניקה" },
                new Course { Id = 5, Name = "נגרות" }
            };   
        }

        List<Course> ICourseService.GeatAllCourses()
        {
            return _courses;
        }
        
        Course ICourseService.GeatCourse(int id)
        {
            return _courses.Where(c=>c.Id == id).FirstOrDefault();
        }
    }
}
