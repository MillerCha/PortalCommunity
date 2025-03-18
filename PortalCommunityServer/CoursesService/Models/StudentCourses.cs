using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models;

public partial class StudentCourses
{
    [Key]
    public int StudentCoursesId { get; set; } // מפתח ראשי (אם לא משתמשים במפתח מרוכב)

    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseId { get; set; }

    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    [ForeignKey("StudentId")]
    public Student? Student { get; set; }

    [ForeignKey("CourseId")]
    public Course? Course { get; set; }
}
