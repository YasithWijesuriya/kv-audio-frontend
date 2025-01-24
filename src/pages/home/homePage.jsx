import Header from "../../components/header";
import{Routes,Route} from 'react-router-dom';
import Home from './home';
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import Error from "./error";

export default function HomePage(){
    return (
    <>
        
        <Header/>
        <div className="w-full h-[calc(100vh-100px)] ">
            <Routes path ="/*">
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/gallery" element={<Gallery/>}/>
              <Route path="/items" element={<Items/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="*" element={<Error/>}/>


            </Routes>
        </div>
    </>
    
   )
}