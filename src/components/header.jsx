import {Link} from 'react-router-dom';
export default function Header(){
    return (
    
        <header className = 'w-full h-[100px] shadow-xl flex justify-center items-center relative bg-accent text-white'>
            <img src="/logo.png" alt="Logo" className="w-[100px] h-[100px] object-cover absolute left-1 border-[3px] rounded-full shadow"/>
            <Link to="/" className="text-[25px] font-bold m-3">Home</Link>
            <Link to="/contact" className="text-[25px] font-bold m-3">Contact</Link>
            <Link to="/gallery" className="text-[25px] font-bold m-3">Gallery</Link>
            <Link to="/items" className="text-[25px] font-bold m-3">Items</Link>

        </header>
    
    
    )
}