import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header
            className="fixed top-0 left-0 right-0 bg-white/40 backdrop-blur-md shadow-none text-black flex items-center justify-between px-6 py-4 z-50">
            <Link
                to="/"
                className="text-xl font-bold">
                NODE
            </Link>
            <nav className="flex items-center space-x-6">
                <Link
                    to="/register"
                    className="bg-blue-500 text-white px-4 py-1 rounded-2xl text-sm font-medium hover:bg-blue-600">
                    회원가입
                </Link>
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-4 py-1 rounded-2xl text-sm font-medium hover:bg-blue-600">
                    로그인
                </Link>
            </nav>
        </header>
    );
};

export default Header;
