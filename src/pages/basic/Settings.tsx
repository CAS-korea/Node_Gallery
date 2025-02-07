import React from 'react';
import PostContainer from "../../components/Container"; // container 컴포넌트 import

const Settings: React.FC = () => {
    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">설정</h1>
            <div className="space-y-4">
                <button className="px-6 py-3 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors">
                    비밀번호 변경
                </button>
                <button className="px-6 py-3 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors">
                    로그아웃
                </button>
            </div>
        </PostContainer>
    );
};

export default Settings;
