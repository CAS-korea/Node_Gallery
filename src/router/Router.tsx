// src/router/Router.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import BasicLayout from "../layouts/BasicLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";
import ResetPassword from "../pages/auth/ResetPassword";

import Home from "../pages/basic/Home";
import Search from "../pages/basic/Search";
import NewPost from "../pages/basic/NewPost";
import Message from "../pages/basic/Message";
import Profile from "../pages/basic/Profile";
import Notification from "../pages/basic/Notification";
import Settings from "../pages/basic/Settings";
import Baik from "../pages/basic/baik";

import Admin from "../pages/admin/Admin";

import Index from "../pages/Index";
import SpecificMessage from "../pages/specific/SpecificMessage";
import SpecificPost from "../pages/specific/SpecificPost";
import OthersProfile from "../pages/specific/OthersProfile";

import { ClientUrl } from "../constants/ClientUrl";

const Router: React.FC = () => (
    <Routes>
        {/* 메인 */}
        <Route path={ClientUrl.INDEX} element={<Index />} />

        {/* 인증 관련 */}
        <Route element={<AuthLayout />}>
            <Route path={ClientUrl.LOGIN} element={<Login />} />
            <Route path={ClientUrl.REGISTER} element={<Register />} />
            <Route path={ClientUrl.FORGOT} element={<Forgot />} />
            <Route path={ClientUrl.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        {/* 관리자 (지금은 그냥 열어 두기) */}
        <Route element={<BasicLayout />}>
            <Route path={ClientUrl.ADMIN} element={<Admin />} />

            {/* 일반 페이지 */}
            <Route path={ClientUrl.HOME} element={<Home />} />
            <Route path={ClientUrl.SEARCH} element={<Search />} />
            <Route path={ClientUrl.PROFILE} element={<Profile />} />
            <Route path={ClientUrl.BAIK} element={<Baik />} />
            <Route path={ClientUrl.NOTIFICATION} element={<Notification />} />
            <Route path={ClientUrl.SETTINGS} element={<Settings />} />
            <Route path={ClientUrl.MESSAGE} element={<Message />} />
            <Route path={ClientUrl.SPECIFICMESSAGE} element={<SpecificMessage />} />

            {/* 파라미터 기반 페이지 */}
            <Route path={`${ClientUrl.OTHERSPROFILE}/:userId`} element={<OthersProfile />} />
        </Route>

        <Route path={`${ClientUrl.SPECIFICPOST}/:postId`} element={<SpecificPost />} />
        <Route path={ClientUrl.NEWPOST} element={<NewPost />} />
    </Routes>
);

export default Router;
