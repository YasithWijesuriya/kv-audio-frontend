import './App.css'
import  ProductCard  from './components/productCard.jsx'

function App() {

return(
  <div>
  <ProductCard name="Coca Cola"  price="400/-" description="It is a cocee" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPwagsrUPMvuj-3EzzLmaKEd4LqvOym2HobFxeSh9iB3jRcxmTNjazwwj9dC-WddyCrc&usqp=CAU"/>

  <ProductCard name="Pepsi"  price="300/-" description="it is a drink" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzSIIxN976Bcr6f8QU7mUM_f5DDbR-goMyMQ&s"/>

  <ProductCard name="poison"  price="free/-" description="It is a poison bottle" img="https://greendroprecycling.com/wp-content/uploads/2017/04/GreenDrop_Station_Aluminum_Can_3.jpg"/>

  </div>
)

}

export default App
