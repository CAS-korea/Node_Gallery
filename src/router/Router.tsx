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
import {ClientUrl} from "../constants/ClientUrl.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            {/* 🔹 메인 경로 */}
            <Route path={ClientUrl.HOME} element={<ProtectedRoute isRoot/>}/>

            {/* 🔹 로그인 & 회원가입 관련 페이지 */}
            <Route element={<AuthLayout/>}>
                <Route path={ClientUrl.LOGIN} element={<Login/>}/>
                <Route path={ClientUrl.REGISTER} element={<Register/>}/>
            </Route>

            {/* 🔹 로그인 후 접근 가능한 모든 페이지를 한 번에 보호 */}
            <Route element={<ProtectedRoute><BasicLayout/></ProtectedRoute>}>
                <Route path={ClientUrl.SEARCH} element={<Search/>}/>
                <Route path={ClientUrl.NEWPOST} element={<NewPost/>}/>
                <Route path={ClientUrl.MESSAGE} element={<DmList/>}/>
                <Route path={ClientUrl.PROFILE} element={<Profile/>}/>
                <Route path={ClientUrl.NOTIFICATION} element={<Alarm/>}/>
                <Route path={ClientUrl.SETTINGS} element={<Settings/>}/>
                <Route path={ClientUrl.MESSAGELOG} element={<DetailDm/>}/>
                <Route path={ClientUrl.SPECIFICPOST} element={<PostView/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
