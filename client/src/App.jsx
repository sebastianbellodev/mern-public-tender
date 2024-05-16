import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { FileProvider } from './contexts/FileContext.jsx';
import { AssessmentMetricProvider } from './contexts/AssessmentMetricContext.jsx';
import { HiringProvider } from './contexts/HiringContext.jsx';
import { HiringProcessCategoryProvider } from './contexts/HiringProcessCategoryContext.jsx';
import { InternationalPolicyProvider } from './contexts/InternationalPolicyContext.jsx';
import { LawProvider } from './contexts/LawContext.jsx';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Hiring from './pages/HiringPage.jsx';
import FileForm from './pages/FileFormPage.jsx';
import TopMenu from './components/TopMenu.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <AssessmentMetricProvider>
          <HiringProvider>
            <HiringProcessCategoryProvider>
              <InternationalPolicyProvider>
                <LawProvider>
                  <BrowserRouter>
                    <TopMenu></TopMenu>
                    <Routes>
                      <Route path="/login" element={<Login></Login>} />
                      <Route element={<ProtectedRoute></ProtectedRoute>}>
                        <Route path="/" element={<Home></Home>} />
                        <Route path="/hirings" element={<Hiring></Hiring>} />
                        <Route path="/files" element={<FileForm></FileForm>} />
                        <Route
                          path="/files/:id"
                          element={<FileForm></FileForm>}
                        />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </LawProvider>
              </InternationalPolicyProvider>
            </HiringProcessCategoryProvider>
          </HiringProvider>
        </AssessmentMetricProvider>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;
