import { CiCirclePlus } from "react-icons/ci";
import{Link} from 'react-router-dom';
export default function AdminItemsPage(){
    return (
        <div className="w-full h-full relative">
            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-900 " />
            </Link>
            
        </div>
    )
}