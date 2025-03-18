using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models;

public partial class Student
{
    [Key]
    [Column("StudentID")]
    public int StudentId { get; set; }

    [StringLength(1000)]
    public string FirstName { get; set; } = null!;

    [StringLength(3000)]
    public string LastName { get; set; } = null!;

    [StringLength(9)]
    public string IdentityNumber { get; set; } = null!;
}
