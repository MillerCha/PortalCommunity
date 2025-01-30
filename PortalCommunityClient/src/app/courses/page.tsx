'use client'
import Image from "next/image";
import BoyBooks from '../images/BoyBooks.jpg'
import { get } from "../../services/requestService";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Course {
  id: number,
  name: string
}
export default function Courses() {
const [coursesList, setCoursesList] = useState([{id:1,name:"123"}]);
  const COURSES_URL = process.env.NEXT_PUBLIC_COURSES_SERVICE_URL;

  const coursesListUrl = `${COURSES_URL}/Courses`;
  console.log(coursesListUrl);

  //var coursesList: course[] = [{id:1,name:"123"}];// = response.data;
  
  const fetchCourses = async () => {
    try {
      const response: AxiosResponse<Course[]> = await axios.get<Course[]>(coursesListUrl);
      setCoursesList(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() =>{
    fetchCourses();
  },[]);
  // 
  //  try {
  //   const response: AxiosResponse<course[]> = await get<course[]>(coursesListurl);
  //   coursesList = response.data;
  // } catch (error) {
  //   console.error("Failed to fetch courses:", error);
  //   return <div>Error loading courses</div>;
  // }
 

  return (
    coursesList.map(i => {
       return (<div key= {i.id}>{i.id}
          <div className="w-full">{i.name}</div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div>)
    })
    
  );
}
