import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './contexts/data/AuthContext.jsx';

function ProtectedRoute() {
  const { loading, authenticated } = useAuthContext();

  if (loading)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="scroll-m-20 text-xl font-medium tracking-tight lg:text-xl">
          Loading some things for you!
        </h1>
      </div>
    );
  if (!loading && !authenticated)
    return <Navigate to="/login" replace></Navigate>;

  return <Outlet></Outlet>;
}

export default ProtectedRoute;
