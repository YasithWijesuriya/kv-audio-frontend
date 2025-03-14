import "./App.css";
import AdminPage from './pages/admin/adminpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';
import LoginPage from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from "./pages/register/register";
import ProductOverview from './pages/home/productOverview';
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";




function App() {

  return (
    <GoogleOAuthProvider clientId="594110653393-ln35j0mk7ofsr1mbegi0oeuno9fbhduc.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes path="/*">
          <Route path="/testing" element={<Testing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          {/*'admin/*' මෙසේ යොදා ඇත්තෙ admin ලෙස url එකේ සදහන් කර එතනින් පස්සෙ ගහන
          ඔනෑම අදාල නැති url වලින් එන අයට මුලින්ම admin page එක පෙන්නීම */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/product/:key" element={<ProductOverview />} />
          <Route path="/*" element={<HomePage />} /> {/* home එකේ url එකෙන් පස්සෙ ගහන අනිත් ඕනෑම අදාල නැති url වලින් එන අයට මුලින්ම home page එක පෙන්නීම*/}


        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )

}

export default App
