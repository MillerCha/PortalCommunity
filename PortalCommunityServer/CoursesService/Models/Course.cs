using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models;

public partial class Course
{
    [Key]
    [Column("CourseID")]
    public int CourseId { get; set; }

    [StringLength(1000)]
    public string Name { get; set; } = null!;

    [StringLength(3000)]
    public string Description { get; set; } = null!;
}
