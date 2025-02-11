import {Navigate, useLocation} from 'react-router-dom';
import Cookies from "js-cookie";
import {ClientUrl} from "../constants/ClientUrl.tsx";

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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, isAdminRoute}) => {
    const location = useLocation();
    const token = Cookies.get('info');
    const userInfo: UserInfo | null = token ? JSON.parse(token) : null;


    // 1. 미인증 사용자 페이지 제한
    if (!userInfo) {
        return <Navigate to={ClientUrl.LOGIN} state={{from: location}} replace/>;
    }

    // 2. 관리자 페이지 접근 시 역할 검사
    if (isAdminRoute) { // 일반 사용자 권한
        if (userInfo.role !== 'CAS_CREATOR') {
            return <Navigate to={ClientUrl.HOME} replace />;
        }
    } else { // 어드민 사용자 권한
        if (userInfo.role === 'CAS_CREATOR') {
            return <Navigate to={ClientUrl.ADMIN} replace />;
        }
    }

    // 3. 인증 사용자 페이지 접근
    return <>{children}</>;
};

export default ProtectedRoute;