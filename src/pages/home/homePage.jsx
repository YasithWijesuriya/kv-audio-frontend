import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Items from "./items";
import Gallery from "./gallery";
import Contact from "./contact";
import About from "./about";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";

export default function HomePage(){
  return(
    <>
      <Header/>
      <div className="min-h-[calc(100vh-70px)] w-full bg-primary">
        <Routes path="/*">
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/items" element={<Items/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/product/:key" element={<ProductOverview/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/*" element={<ErrorNotFound/>}/>
        </Routes>
      </div>
    </>
  )
}