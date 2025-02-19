import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ClientUrl } from "../constants/ClientUrl.ts";

interface ProtectedRouteProps {
    isAdminRoute?: boolean;
}

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdminRoute }) => {
    const location = useLocation();
    const token = Cookies.get("info");
    const userInfo: UserInfo | null = token ? JSON.parse(token) : null;

    // 🔹 인증 관련 페이지 목록 (Object.values를 활용하여 배열로 변환)
    const authPages = Object.values({
        INDEX: ClientUrl.INDEX,
        LOGIN: ClientUrl.LOGIN,
        REGISTER: ClientUrl.REGISTER,
        FORGOT: ClientUrl.FORGOT,
        RESET_PASSWORD: ClientUrl.RESET_PASSWORD,
    }) as string[];

    const isAuthPage = authPages.includes(location.pathname);

    /** 🔹 1. 로그인한 사용자가 인증 관련 페이지(/, /login, /register 등)에 접근하면 /home으로 이동 */
    if (userInfo && isAuthPage) {
        return <Navigate to={ClientUrl.HOME} replace />;
    }

    /** 🔹 2. 로그인하지 않은 사용자가 보호된 페이지에 접근하면 로그인 페이지로 이동 */
    if (!userInfo && !isAuthPage) {
        return <Navigate to={ClientUrl.LOGIN} state={{ from: location }} replace />;
    }

    /** 🔹 3. 관리자 페이지 접근 시 권한 검사 (CAS_CREATOR만 접근 가능) */
    if (isAdminRoute && (!userInfo || userInfo.role !== "CAS_CREATOR")) {
        return <Navigate to={ClientUrl.HOME} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;