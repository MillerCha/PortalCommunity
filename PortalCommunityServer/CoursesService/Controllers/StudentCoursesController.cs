using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoursesService.BL;
using CoursesService.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace CoursesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentCoursesController : ControllerBase
    {
        private readonly CoursesContext _context;
        private readonly StudentCourseService _studentCourseService;

        public StudentCoursesController(CoursesContext context,StudentCourseService studentCourseService)
        {
            _context = context;
            _studentCourseService = studentCourseService;
        }

        // GET: api/StudentCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentCourses>>> GetStudentCourses()
        {
            return await _context.StudentCourses.ToListAsync();
        }

        // GET: api/StudentCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentCourses>> GetStudentCourses(int id)
        {
            var studentCourses = await _context.StudentCourses.FindAsync(id);

            if (studentCourses == null)
            {
                return NotFound();
            }

            return studentCourses;
        }

        // PUT: api/StudentCourses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentCourses(int id, StudentCourses studentCourses)
        {
            if (id != studentCourses.StudentCoursesId)
            {
                return BadRequest();
            }

            _context.Entry(studentCourses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentCoursesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentCourses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentCourses>> PostStudentCourses(StudentCourses studentCourses)
        {
            _context.StudentCourses.Add(studentCourses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentCourses", new { id = studentCourses.StudentCoursesId }, studentCourses);
        }

        // DELETE: api/StudentCourses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentCourses(int id)
        {
            var studentCourses = await _context.StudentCourses.FindAsync(id);
            if (studentCourses == null)
            {
                return NotFound();
            }

            _context.StudentCourses.Remove(studentCourses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollStudent([FromBody] EnrollStudentRequest request)
        {
            if (request == null || request.StudentIdentityNumber == string.Empty || request.CourseId <= 0)
                return BadRequest("Invalid request data.");

            var success = await _studentCourseService.EnrollStudentAsync(request.StudentIdentityNumber, request.StudentFirstName,request.StudentLastName, request.CourseId);

            if (!success)
                return Conflict("Enrollment failed. Student may already be enrolled or course does not exist.");

            return Ok("Student enrolled successfully.");
        }


        private bool StudentCoursesExists(int id)
        {
            return _context.StudentCourses.Any(e => e.StudentCoursesId == id);
        }
    }
}
