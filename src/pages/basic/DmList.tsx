import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostContainer from "../../components/Container";
import { ClientUrl } from "../../constants/ClientUrl";

interface DM {
    id: number;
    role: string;
    name: string;
    lastMessage: string;
}

const dummyDMs: DM[] = [
    { id: 1, name: "홍길동", role: "관리자", lastMessage: "마지막 메시지" },
    { id: 2, name: "김철수", role: "관리자", lastMessage: "마지막 메시지" },
    { id: 3, name: "박영희", role: "관리자", lastMessage: "마지막 메시지" },
];

const DmList: React.FC = () => {
    const navigate = useNavigate();

    const handleDMClick = (dm: DM) => {
        navigate(ClientUrl.MESSAGELOG, { state: { dm } });
    };

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">채팅 목록</h1>
            <ul className="space-y-4">
                {dummyDMs.map(dm => (
                    <li
                        key={dm.id}
                        onClick={() => handleDMClick(dm)}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md shadow transition-all hover:shadow-lg cursor-pointer"
                    >
                        <div className="flex justify-between items-center">
                            {/* 이름과 역할을 하나의 그룹으로 묶음 */}
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                    {dm.name}
                                </span>
                                <span className="text-sm opacity-50 text-gray-600 dark:text-gray-400">
                                    {dm.role}
                                </span>
                            </div>
                            {/* 마지막 메시지는 오른쪽 정렬 */}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {dm.lastMessage}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </PostContainer>
    );
};

export default DmList;
