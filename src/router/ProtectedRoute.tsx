import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import {ClientUrl} from "../constants/ClientUrl.ts";

interface ProtectedRouteProps {
    children?: React.ReactNode;
    isAdminRoute?: boolean;
}

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           isAdminRoute,
                                                       }) => {
    const location = useLocation();
    const token = Cookies.get('info');
    const userInfo: UserInfo | null = token ? JSON.parse(token) : null;

    // 1. 로그인 안 되었으면 로그인 페이지로 이동
    if (!userInfo) {
        return <Navigate to={ClientUrl.LOGIN} state={{ from: location }} replace />;
    }

    // 2. 관리자 페이지 접근 시 역할 검사
    if (isAdminRoute) {
        // 관리자 권한 없으면 홈으로 보냄
        if (userInfo.role !== 'CAS_CREATOR') {
            return <Navigate to={ClientUrl.HOME} replace />;
        }
    }

    // 3. 인증 사용자 페이지 접근
    return <>{children}</>;
};

export default ProtectedRoute;