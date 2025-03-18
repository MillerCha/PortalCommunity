namespace CoursesService.DTO
{
    public class EnrollStudentRequest
    {
        public string StudentIdentityNumber { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentLastName { get; set; }
        public int CourseId { get; set; }
    }
}
