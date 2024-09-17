import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/data/AuthContext.jsx';
import { FileProvider } from './contexts/data/FileContext.jsx';
import { AssessmentMetricProvider } from './contexts/data/AssessmentMetricContext.jsx';
import { HiringProvider } from './contexts/data/HiringContext.jsx';
import { HiringProcessCategoryProvider } from './contexts/data/HiringProcessCategoryContext.jsx';
import { InternationalPolicyProvider } from './contexts/data/InternationalPolicyContext.jsx';
import { LawProvider } from './contexts/data/LawContext.jsx';
import { CompanyProvider } from './contexts/data/CompanyContext.jsx';
import { AddressProvider } from './contexts/data/AddressContext.jsx';

import ThemeProvider from '@/components/theme-provider';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Hiring from './pages/HiringPage.jsx';
import FileForm from './pages/FileFormPage.jsx';
import Supplier from './pages/SupplierPage.jsx';
import SupplierForm from './pages/SupplierFormPage.jsx';
import TopNavigationMenu from './components/TopNavigationMenu.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AddressProvider>
          <CompanyProvider>
            <FileProvider>
              <AssessmentMetricProvider>
                <HiringProvider>
                  <HiringProcessCategoryProvider>
                    <InternationalPolicyProvider>
                      <LawProvider>
                        <BrowserRouter>
                          <TopNavigationMenu></TopNavigationMenu>
                          <Routes>
                            <Route path="/login" element={<Login></Login>} />
                            <Route element={<ProtectedRoute></ProtectedRoute>}>
                              <Route path="/" element={<Home></Home>} />
                              <Route
                                path="/hirings"
                                element={<Hiring></Hiring>}
                              />
                              <Route
                                path="/files"
                                element={<FileForm></FileForm>}
                              />
                              <Route
                                path="/files/:id"
                                element={<FileForm></FileForm>}
                              />
                              <Route
                                path="/tenderers"
                                element={<Supplier></Supplier>}
                              />
                              <Route
                                path="/suppliers"
                                element={<SupplierForm></SupplierForm>}
                              />
                              <Route
                                path="/suppliers/:id"
                                element={<SupplierForm></SupplierForm>}
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
          </CompanyProvider>
        </AddressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
