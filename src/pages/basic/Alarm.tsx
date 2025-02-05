import React from 'react';

const Alarm: React.FC = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">알림</h1>
            <ul className="space-y-4">
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">홍길동</span>님이 게시물을 올렸습니다.
                </li>
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">김철수</span>님이 댓글을 달았습니다.
                </li>
                <li className="bg-gray-800 p-4 rounded-md">
                    <span className="font-semibold">박영희</span>님이 메시지를 보냈습니다.
                </li>
            </ul>
        </div>
    );
};

export default Alarm;
