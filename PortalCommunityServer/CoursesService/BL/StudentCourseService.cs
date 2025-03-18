using Microsoft.EntityFrameworkCore;
using Models;

namespace CoursesService.BL
{
    public class StudentCourseService
    {
        private readonly CoursesContext _context;

        public StudentCourseService(CoursesContext context)
        {
            _context = context;
        }

        public async Task<bool> EnrollStudentAsync(string studentIdentityNumber, string studentFirstName, string studentLastName, int courseId)
        {
            var student = await _context.Student.Where(s => s.IdentityNumber == studentIdentityNumber).FirstOrDefaultAsync();

            if (student == null)
            {
                student = new Student
                {
                    IdentityNumber = studentIdentityNumber,
                    FirstName = studentFirstName,
                    LastName = studentLastName
                };
                _context.Student.Add(student);
                await _context.SaveChangesAsync();
            }

            var course = await _context.Courses.FindAsync(courseId);
            if (course == null) return false; // הקורס לא נמצא

            var existingEnrollment = await _context.StudentCourses
                .AnyAsync(sc => sc.StudentId == student.StudentId && sc.CourseId == courseId);

            if (existingEnrollment) return false; // התלמיד כבר רשום

            var enrollment = new StudentCourses
            {
                StudentId = student.StudentId,
                CourseId = courseId
            };

            _context.StudentCourses.Add(enrollment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

