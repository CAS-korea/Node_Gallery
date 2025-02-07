import React from 'react';
import PostContainer from "../../components/Container"; // container 컴포넌트 import

const Alarm: React.FC = () => {
    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">알림</h1>
            <ul className="space-y-4">
                <li className="bg-gray-100 p-4 rounded-md">
                    <span className="font-semibold">홍길동</span>님이 게시물을 올렸습니다.
                </li>
                <li className="bg-gray-100 p-4 rounded-md">
                    <span className="font-semibold">김철수</span>님이 댓글을 달았습니다.
                </li>
                <li className="bg-gray-100 p-4 rounded-md">
                    <span className="font-semibold">박영희</span>님이 메시지를 보냈습니다.
                </li>
            </ul>
        </PostContainer>
    );
};

export default Alarm;
