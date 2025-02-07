import React from 'react';
import PostContainer from "../../components/Container";

const DmList: React.FC = () => {
    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">채팅 목록</h1>
            <ul className="space-y-4">
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">홍길동</span> - 마지막 메시지
                </li>
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">김철수</span> - 마지막 메시지
                </li>
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">박영희</span> - 마지막 메시지
                </li>
            </ul>
        </PostContainer>
    );
};

export default DmList;
