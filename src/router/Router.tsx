import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.tsx';
import BasicLayout from '../layouts/BasicLayout.tsx';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Forgot from '../pages/auth/Forgot.tsx';
import Search from '../pages/basic/Search.tsx';
import NewPost from '../pages/basic/NewPost.tsx';
import DmList from '../pages/basic/DmList.tsx';
import Profile from '../pages/basic/Profile.tsx';
import Notification from '../pages/basic/Notification.tsx';
import Settings from '../pages/basic/Settings.tsx';
import DetailDm from '../pages/basic/DetailDm.tsx';
import PostView from '../pages/basic/PostView.tsx';
import {ClientUrl} from "../constants/ClientUrl.ts";
import Home from "../pages/basic/Home.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import Admin from "../pages/admin/Admin.tsx";
import Index from "../pages/Index.tsx";
import ResetPassword from "../pages/auth/ResetPassword.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            {/* 🔹 메인 경로 */}
            <Route path={ClientUrl.INDEX}>
                <Route path={ClientUrl.INDEX} element={<Index/>}/>
            </Route>

            {/* 🔹 로그인 & 회원가입 관련 페이지 */}
            <Route element={<AuthLayout/>}>
                <Route path={ClientUrl.LOGIN} element={<Login/>}/>
                <Route path={ClientUrl.REGISTER} element={<Register/>}/>
                <Route path={ClientUrl.FORGOT} element={<Forgot />}/>
                <Route path={ClientUrl.RESET_PASSWORD} element={<ResetPassword />}/>
            </Route>

            {/* 🔹 관리자 페이지 (CAS_CREATOR만 접근 가능)*/}
            <Route element={<ProtectedRoute isAdminRoute><AdminLayout/></ProtectedRoute>}>
                <Route path={ClientUrl.ADMIN} element={<Admin/>}/>
                <Route path={ClientUrl.HOME} element={<Home/>}/>
                <Route path={ClientUrl.SEARCH} element={<Search/>}/>
                <Route path={ClientUrl.NEWPOST} element={<NewPost/>}/>
                <Route path={ClientUrl.PROFILE} element={<Profile/>}/>
                <Route path={ClientUrl.NOTIFICATION} element={<Notification/>}/>
                <Route path={ClientUrl.SETTINGS} element={<Settings/>}/>
                <Route path={ClientUrl.MESSAGE} element={<DmList/>}/>
                <Route path={ClientUrl.MESSAGELOG} element={<DetailDm/>}/>
                <Route path={ClientUrl.SPECIFICPOST} element={<PostView/>}/>
            </Route>

            {/* 🔹 로그인 후 접근 가능한 모든 페이지를 한 번에 보호 */}
            <Route element={<ProtectedRoute><BasicLayout/></ProtectedRoute>}>
                <Route path={ClientUrl.HOME} element={<Home/>}/>
                <Route path={ClientUrl.SEARCH} element={<Search/>}/>
                <Route path={ClientUrl.NEWPOST} element={<NewPost/>}/>
                <Route path={ClientUrl.PROFILE} element={<Profile/>}/>
                <Route path={ClientUrl.NOTIFICATION} element={<Notification/>}/>
                <Route path={ClientUrl.SETTINGS} element={<Settings/>}/>
                <Route path={ClientUrl.MESSAGE} element={<DetailDm/>}/>
                <Route path={ClientUrl.SPECIFICPOST} element={<PostView/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
