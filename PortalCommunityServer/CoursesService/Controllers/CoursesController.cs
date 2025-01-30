using CoursesService.Interfaces;
using CoursesService.Model;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace CoursesService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoursesController : ControllerBase
    {

        private readonly ILogger<CoursesController> _logger;
        private readonly ICourseService _courseService;

        public CoursesController(ILogger<CoursesController> logger, ICourseService courseService)
        {
            _logger = logger;
            _courseService = courseService;

        }

        [HttpGet(Name = "GetAll")]
        public IActionResult GetAll()
        {
            var courses = _courseService.GeatAllCourses();
            return Ok(courses);
        }

        [HttpGet("{id:int}", Name = "GetById")]
        public IActionResult GetById(int id)
        {
            var course = _courseService.GeatCourse(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);

        }
    }
}
