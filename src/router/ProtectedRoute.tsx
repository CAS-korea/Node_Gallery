import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useServices } from '../contextAPI/ServicesProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { authState, setAuthState } = useServices();
    const location = useLocation();  // useLocation을 사용하여 URL 변화를 감지

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthState((prev) => ({ ...prev, isAuthenticated: true }));
            console.log("Authenticated true 변경 완료");
        } else {
            setAuthState((prev) => ({ ...prev, isAuthenticated: false }));
            console.log("Authenticated false 변경 완료");
        }
    }, [location]);  // location이 변경될 때마다 useEffect 실행

    if (!authState.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;