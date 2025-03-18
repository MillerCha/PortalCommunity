'use client'
import React, { useState } from "react";
import axios from "axios";

interface RegisterCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: { courseId: number; name: string };
}

const RegisterCourseModal: React.FC<RegisterCourseModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  if (!isOpen) return null;

  const [studentIdentityNumber, setStudentIdentityNumber] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // פונקציה לסגירת המודל בעת לחיצה מחוץ למודל
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // פונקציה לטיפול בהרשמה לקורס
  const handleRegister = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // שליחת נתוני הרישום לשרת
      const response = await axios.post("https://localhost:44379/api/StudentCourses/enroll", {
        StudentIdentityNumber: studentIdentityNumber,
        StudentFirstName: studentFirstName,
        StudentLastName: studentLastName,
        CourseId: course.courseId,
      });

      // במידה והרישום הצליח, נסגור את המודל
      if (response.status === 200) {
        onClose();
      }
    } catch (err) {
      setError("An error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Register for {course.name}</h2>
        <div>
          <label htmlFor="identityNumber" className="block mb-2">
            Identity Number
          </label>
          <input
            type="text"
            id="identityNumber"
            value={studentIdentityNumber}
            onChange={(e) => setStudentIdentityNumber(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={studentFirstName}
            onChange={(e) => setStudentFirstName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={studentLastName}
            onChange={(e) => setStudentLastName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterCourseModal;