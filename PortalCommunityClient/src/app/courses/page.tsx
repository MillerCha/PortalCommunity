import axios from "axios";

// In development mode, this disables SSL certificate validation to allow 
// requests to self-signed HTTPS servers (e.g., localhost with HTTPS).
// ⚠ For production, it's recommended to install a valid SSL certificate instead 
//   of disabling validation.
// Alternative: You can generate and trust a local certificate using `mkcert` or 
//   `dotnet dev-certs https --trust`.

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { Suspense } from "react";
import CourseItem from "./components/courseItem";



async function fetchCourses(): Promise<Course[]> {
  const COURSES_URL = process.env.NEXT_PUBLIC_COURSES_SERVICE_URL;
  const coursesListUrl = `https://localhost:44379/api/Courses`;

  try {
    const response = await axios.get(coursesListUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}


export default async function Courses() {
  const coursesList = await fetchCourses();

  return (
    <div>
      {JSON.stringify(coursesList)}
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesList.map((course) => (
          <CourseItem key={course.courseId} course={course} />
          
        ))}
      </div>
    </div>
  );
}
