import React from 'react';

const DmList: React.FC = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
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
        </div>
    );
};

export default DmList;
