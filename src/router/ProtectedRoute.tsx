import {Navigate, useLocation} from 'react-router-dom';
import Home from "../pages/basic/Home.tsx";
import Index from "../pages/Index.tsx";
import BasicLayout from "../layouts/BasicLayout.tsx";
import Cookies from "js-cookie";
import {ROUTES} from "../constants/ROUTES.tsx";

interface ProtectedRouteProps {
    children?: React.ReactNode;
    isRoot?: boolean;  // 루트 경로인지 여부를 판단하는 속성
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isRoot = false }) => {
    const token = Cookies.get('token');
    const location = useLocation();  // useLocation을 사용하여 URL 변화를 감지

    // 루트 경로에서 조건부 렌더링
    if (isRoot) {
        return token ? (
            <BasicLayout>
                <Home />
            </BasicLayout>
        ) : (
            <Index />
        );
    }

    // 비루트 경로에서 토큰이 없을 시 리다이렉트
    if (!token) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;