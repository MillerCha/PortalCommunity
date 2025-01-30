'use client';
import Image from "next/image";
import BoyBooks from '../images/BoyBooks.jpg'

export default function Home() {
  return (
   <div>
          <Image src={BoyBooks} alt='BoyBooks'
            className="w-96 h-96 absolute left-0 bottom-0"></Image>
        </div>
      
  );
}
