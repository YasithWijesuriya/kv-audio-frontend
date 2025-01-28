import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/admin/Adminpage';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';



function App() {

  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/testing" element = {<Testing/>}/>
        <Route path ="/admin/*" element={<AdminPage/>}/>
        {/*'admin/*' මෙසේ යොදා ඇත්තෙ admin ලෙස url එකේ සදහන් කර එතනින් පස්සෙ ගහන
        ඔනෑම අදාල නැති url වලින් එන අයට මුලින්ම admin page එක පෙන්නීම */}
        
        <Route path = "/*" element={<HomePage/>}/> {/* home එකේ url එකෙන් පස්සෙ ගහන අනිත් ඕනෑම අදාල නැති url වලින් එන අයට මුලින්ම home page එක පෙන්නීම*/}

      </Routes>
  </BrowserRouter>
  )

}

export default App
