import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
