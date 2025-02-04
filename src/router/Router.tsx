import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import BasicLayout from '../layouts/BasicLayout';
import ProtectedRoute from './ProtectedRoute'; // ✅ 추가
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import DmList from '../pages/DmList';
import Profile from '../pages/Profile';
import Alarm from '../pages/Alarm';
import Settings from '../pages/Settings';
import DetailDm from '../pages/DetailDm';
import PostView from '../pages/PostView.tsx';
import Index from "../pages/auth/Index.tsx";

const Router: React.FC = () => {
    return (
        <Routes>
            {/* 🔹 로그인 & 회원가입 관련 페이지 */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/index" element={<Index />} />

            {/* 🔹 로그인 후 접근 가능한 모든 페이지를 한 번에 보호 */}
            <Route element={<ProtectedRoute><BasicLayout /></ProtectedRoute>}>
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/dm-list" element={<DmList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/alarm" element={<Alarm />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/dm/:dmId" element={<DetailDm />} />
                <Route path="/post/:postId" element={<PostView />} />
            </Route>
        </Routes>
    );
};

export default Router;
