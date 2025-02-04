// MovingBlurBackground.tsx
import React from 'react';
import './Index.css';

const Index: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">

            <div className="relative w-full max-w-lg">
                {/* 배경 컨테이너*/}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* 텍스트 컨테이너 */}
                <div className="relative z-10 animate-fade-in">
                    <h1 className="text-white text-3xl font-serif text-center text-shadow tracking-wide leading-relaxed">
                        Show Your Best.
                    </h1>
                    <h1 className="text-white text-7xl font-serif text-center text-shadow tracking-wide leading-none">
                        NODE
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Index;