import React from 'react';
import {Link} from 'react-router-dom';
import {ClientUrl} from "../constants/ClientUrl.ts";

const Header: React.FC = () => {
    return (
        <header
            className="fixed top-0 left-2 right-0 backdrop-blur-md shadow-none text-black flex items-center justify-between px-6 py-4 z-50">
            <Link
                to={ClientUrl.HOME}
                className="text-base font-bold transition-all duration-200 ease-in-out transform hover:scale-110">
                NODE
            </Link>
            <nav className="flex items-center space-x-6">
            </nav>
        </header>
    );
};

export default Header;
