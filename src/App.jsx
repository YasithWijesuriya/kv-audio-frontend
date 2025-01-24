import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/admin/Adminpage';
import HomePage from './pages/home/homePage';



function App() {

  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path ="/admin/*" element={<AdminPage/>}/>
        <Route path = "/*" element={<HomePage/>}/> {/* home එකේ url එකෙන් පස්සෙ ගහන අනිත් ඕනෑම අදාල නැති url වලින් එන අයට මුලින්ම home page එක පෙන්නීම*/}

      </Routes>
  </BrowserRouter>
  )

}

export default App
