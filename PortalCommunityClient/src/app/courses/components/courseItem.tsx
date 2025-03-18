'use client'
import React, { useState } from "react";
import RegisterCourseModal from "./RegisterCourseModal";  // import the modal

interface CourseItemProps {
  course: { courseId: number; name: string; description: string };
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{course.name}</h2>
      <p className="text-gray-600">{course.description}</p>
      <button
        onClick={handleOpenModal}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>

      {/* RegisterCourseModal will open when the state is true */}
      <RegisterCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={course}
      />
    </div>
  );
};

export default CourseItem;
