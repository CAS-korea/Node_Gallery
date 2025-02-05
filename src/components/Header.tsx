import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from "../constants/routes.tsx";

const Header: React.FC = () => {
    return (
        <header
            className="fixed top-0 left-0 right-0 backdrop-blur-md shadow-none text-black flex items-center justify-between px-6 py-4 z-50">
            <Link
                to={ROUTES.HOME}
                className="text-base font-bold transition-all duration-200 ease-in-out transform hover:scale-110">
                NODE
            </Link>
            <nav className="flex items-center space-x-6">
                <Link
                    to={ROUTES.REGISTER}
                    className="text-black px-5 py-1 text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-110 hover:font-bold hover: font-color">
                    회원가입
                </Link>
                <Link
                    to={ROUTES.LOGIN}
                    className="text-black px-5 py-1 text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-110 hover:font-bold">
                    로그인
                </Link>
            </nav>
        </header>
    );
};

export default Header;