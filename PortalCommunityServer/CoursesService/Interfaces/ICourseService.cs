using Models;

namespace CoursesService.Interfaces
{
    public interface ICourseService
    {
        List<Course> GeatAllCourses();
        Course GeatCourse(int id);
    }
}
