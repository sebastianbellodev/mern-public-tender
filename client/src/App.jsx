import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { FileProvider } from './contexts/FileContext.jsx';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Hiring from './pages/HiringPage.jsx';
import TopMenu from './components/TopMenu.jsx';

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <BrowserRouter>
          <TopMenu></TopMenu>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/hiring" element={<Hiring></Hiring>} />
          </Routes>
        </BrowserRouter>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;
