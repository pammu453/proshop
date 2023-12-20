import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth);
    
    if (userInfo && userInfo.isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;