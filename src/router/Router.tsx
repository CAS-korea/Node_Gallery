import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.tsx';
import BasicLayout from '../layouts/BasicLayout.tsx';
import ProtectedRoute from './ProtectedRoute'; // ✅ 추가
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Search from '../pages/basic/Search.tsx';
import NewPost from '../pages/basic/NewPost.tsx';
import DmList from '../pages/basic/DmList.tsx';
import Profile from '../pages/basic/Profile.tsx';
import Alarm from '../pages/basic/Alarm.tsx';
import Settings from '../pages/basic/Settings.tsx';
import DetailDm from '../pages/basic/DetailDm.tsx';
import PostView from '../pages/basic/PostView.tsx';
import {ROUTES} from "../constants/ROUTES.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            {/* 🔹 메인 경로 */}
            <Route path={ROUTES.HOME} element={<ProtectedRoute isRoot/>}/>

            {/* 🔹 로그인 & 회원가입 관련 페이지 */}
            <Route element={<AuthLayout/>}>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTER} element={<Register/>}/>
            </Route>

            {/* 🔹 로그인 후 접근 가능한 모든 페이지를 한 번에 보호 */}
            <Route element={<ProtectedRoute><BasicLayout/></ProtectedRoute>}>
                <Route path={ROUTES.SEARCH} element={<Search/>}/>
                <Route path={ROUTES.NEWPOST} element={<NewPost/>}/>
                <Route path={ROUTES.MESSAGE} element={<DmList/>}/>
                <Route path={ROUTES.PROFILE} element={<Profile/>}/>
                <Route path={ROUTES.NOTIFICATION} element={<Alarm/>}/>
                <Route path={ROUTES.SETTINGS} element={<Settings/>}/>
                <Route path={ROUTES.MESSAGELOG} element={<DetailDm/>}/>
                <Route path={ROUTES.SPECIFICPOST} element={<PostView/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
