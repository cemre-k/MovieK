import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
