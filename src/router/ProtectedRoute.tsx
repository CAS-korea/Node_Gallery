import { useEffect } from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import { useServices } from '../contextAPI/ServicesProvider';
import Home from "../pages/Home.tsx";
import Index from "../pages/auth/Index.tsx";
import BasicLayout from "../layouts/BasicLayout.tsx";

interface ProtectedRouteProps {
    children?: React.ReactNode;
    redirectTo?: string;
    isRoot?: boolean;  // 루트 경로인지 여부를 판단하는 속성
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = "/login", isRoot = false }) => {
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
    }, [location, setAuthState]);  // location이 변경될 때마다 useEffect 실행

    // 루트 경로에서 조건부 렌더링
    if (isRoot) {
        return authState.isAuthenticated ? (
            <BasicLayout>
                <Home />
            </BasicLayout>
        ) : (
            <Index />
        );

    }

    if (!authState.isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;