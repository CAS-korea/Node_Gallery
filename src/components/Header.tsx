import React from 'react';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-50">
            <Link to="/home">
                <h1 className="text-2xl font-bold">NODE</h1>
            </Link>
        </header>
    );
};

export default Header;
