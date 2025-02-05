import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">설정</h1>
            <div className="space-y-4">
                <button className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                    비밀번호 변경
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Settings;
