import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 bg-white/40 backdrop-blur-md shadow-none text-black flex items-center justify-between py-2">
            <span className="font-thin font-xs">Copyright © CAS 2025. All rights reserved.</span>
        </footer>
    );
};

export default Footer;