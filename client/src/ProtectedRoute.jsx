import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext.jsx';

function ProtectedRoute() {
  const { loading, authenticated } = useAuthContext();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !authenticated)
    return <Navigate to="/login" replace></Navigate>;

  return <Outlet></Outlet>;
}

export default ProtectedRoute;
