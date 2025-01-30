import Link from "next/link";
import MenuItem from "@/model/menuItem";

interface MenuLinkProps{
    item:MenuItem
}
const MenuLink: React.FC<MenuLinkProps> = ({item}) => {

return(<Link href={item.href}>
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
          </Link>);

}

export default MenuLink;