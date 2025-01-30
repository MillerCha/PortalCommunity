'use client';

import { 
  FaChild, FaMusic, FaLeaf, FaBook, FaUsers, 
  FaBell, FaArrowLeft, FaArrowRight 
} from "react-icons/fa";
import MenuLink from "./menuLink";
import MenuItem from "@/model/menuItem";

const MenuCarousel: React.FC = () => {


  const items: MenuItem[] = [
    { label: "דף הבית", icon: <FaChild />, color: "bg-pink-400", href: "/" },
    { label: "גיל הרך", icon: <FaChild />, color: "bg-red-400", href: "/earlyChildhood" },
    { label: "חוגים", icon: <FaMusic />, color: "bg-blue-400", href: "/courses" },
    { label: "גיל הזהב", icon: <FaLeaf />, color: "bg-green-400", href: "/goldenAge" },
    { label: "ספריה", icon: <FaBook />, color: "bg-yellow-400", href: "/library" },
    { label: "תרבות", icon: <FaUsers />, color: "bg-orange-400", href: "/culture" },
    { label: "עדכונים", icon: <FaBell />, color: "bg-pink-400", href: "/updates" },
    { label: "", icon: <></>, color: "bg-yellow-400", href: "/education" },
    { label: "", icon: <></>, color: "bg-purple-400", href: "/specialEducation" },
    { label: "", icon: <></>, color: "bg-pink-400", href: "/events" },
  ];

  return (
    <div className="relative w-full">

      {/* תפריט */}
      <div
        className="flex overflow-x-auto gap-8 px-10 scrollbar-hide"
      >
        {items.map((item, index) => (
          <MenuLink key={index} item={item} />
        ))}
      </div>


    </div>
  );
};

export default MenuCarousel;