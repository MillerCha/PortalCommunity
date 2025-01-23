'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  FaChild,
  FaMusic,
  FaLeaf,
  FaBook,
  FaUsers,
  FaBell,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

interface MenuItem {
  label: string;
  icon: React.JSX.Element;
  color: string;
  href: string;
}

const MenuCarousel: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const items: MenuItem[] = [
    { label: "גיל הרך", icon: <FaChild />, color: "bg-red-400", href: '/earlyChildhood' },
    { label: "חוגים", icon: <FaMusic />, color: "bg-blue-400", href: '/courses' },
    { label: "גיל הזהב", icon: <FaLeaf />, color: "bg-green-400", href: '/goldenAge' },
    { label: "ספריה", icon: <FaBook />, color: "bg-yellow-400", href: '/library' },
    { label: "תרבות", icon: <FaUsers />, color: "bg-orange-400", href: '/culture' },
    { label: "עידכונים", icon: <FaBell />, color: "bg-pink-400", href: '/updates' },
    { label: "חינוך", icon: <FaBook />, color: "bg-yellow-400", href: '/education' },
    { label: "צמיד", icon: <FaUsers />, color: "bg-purple-400", href: '/specialEducation' },
    { label: "ארועים", icon: <FaBell />, color: "bg-pink-400", href: '/events' },
    { label: "דף הבית", icon: <FaChild />, color: "bg-red-400", href: '/' },

  ];

  const scrollMenu = (direction: "left" | "right") => {
    if (menuRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        direction === "left"
          ? menuRef.current.scrollLeft - scrollAmount
          : menuRef.current.scrollLeft + scrollAmount;

      menuRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });

      // עדכון מצב כפתורי הגלילה
      setTimeout(() => {
        setCanScrollLeft(menuRef.current!.scrollLeft > 0);
        setCanScrollRight(
          menuRef.current!.scrollWidth >
          menuRef.current!.scrollLeft + menuRef.current!.clientWidth
        );
      }, 300);
    }
  };

  return (
    <div className="relative w-full ">
      {/* כפתור שמאלה */}
      <button
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 shadow ${canScrollLeft ? "visible" : "invisible"
          }`}
        onClick={() => scrollMenu("left")}
        aria-label="Scroll left"
      >
        <FaArrowLeft />
      </button>

      {/* תפריט */}
      <div
        ref={menuRef}
        className="flex overflow-x-auto gap-8 px-10 scrollbar-hide mr-8 ml-8"
      >
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`mr-5 ml-5 mb-11 flex flex-col 
              items-center justify-center
              text-center  rounded-b-full shadow-md cursor-pointer 
              transform transition-all duration-300 hover:scale-125 ${item.color}`}
              style={{ minWidth: '120px', width: '120px', height: '250px' }}
            >
              <div className="text-white text-5xl mb-2">{item.icon}</div>
              <span className="text-xl text-white">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* כפתור ימינה */}
      <button
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 shadow ${canScrollRight ? "visible" : "invisible"
          }`}
        onClick={() => scrollMenu("right")}
        aria-label="Scroll right"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MenuCarousel;