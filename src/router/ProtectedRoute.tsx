import {Navigate, useLocation} from 'react-router-dom';
import Home from "../pages/basic/Home.tsx";
import Index from "../pages/Index.tsx";
import BasicLayout from "../layouts/BasicLayout.tsx";
import Cookies from "js-cookie";
import {ClientUrl} from "../constants/ClientUrl.tsx";
import Admin from "../pages/admin/Admin.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";

interface ProtectedRouteProps {
    children?: React.ReactNode;
    isRoot?: boolean;  // 루트 경로인지 여부를 판단하는 속성
}

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, isRoot = false}) => {
    const location = useLocation();  // useLocation을 사용하여 URL 변화를 감지

    const token = Cookies.get('info');
    const userInfo: UserInfo | null = token ? JSON.parse(token) : null;

    if (isRoot) {
        return userInfo ? (
            userInfo.role === 'CAS_CREATOR' ? (
                <AdminLayout>
                    <Admin />
                </AdminLayout>
            ) : (
                <BasicLayout>
                    <Home />
                </BasicLayout>
            )
        ) : (
            <Index />
        );
    }

    // 비루트 경로에서 토큰이 없을 시 리다이렉트
    if (!userInfo) {
        return <Navigate to={ClientUrl.LOGIN} state={{from: location}} replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;