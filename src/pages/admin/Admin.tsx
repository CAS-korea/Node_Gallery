import React, {useEffect, useState} from 'react';
import PostContainer from "../../components/Container";
import {useServices} from "../../context/ServicesProvider.tsx";
import {UserEntity} from "../../types/UserEntity.ts";

const Admin: React.FC = () => {
    const {authorizeUser, getNonuserList, getUserList, updateUserInfo} = useServices();

    //  상태 관리 (초기값 빈 배열)
    const [userList, setUserList] = useState<UserEntity[]>([]);
    const [nonuserList, setNonuserList] = useState<UserEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingUser, setEditingUser] = useState<UserEntity | null>(null);


    const fetchData = async () => {
        try {
            const users = await getUserList();  // 유저 목록 가져오기
            const nonUsers = await getNonuserList();  // 비유저 목록 가져오기

            setUserList(users);
            setNonuserList(nonUsers);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 500);
    }, [getUserList, getNonuserList]);

    // 사용자 승인 처리
    const handleAccept = async (userId: string) => {
        try {
            await authorizeUser(userId, 'accept');
            alert('사용자가 승인되었습니다.');
            await fetchData();
        } catch (error) {
            console.error("승인 실패:", error);
        }
    }

    // 사용자 거부 처리
    const handleReject = async (userId: string) => {
        try {
            await authorizeUser(userId, 'reject');
            alert('사용자가 거부되었습니다.');
            await fetchData();
        } catch (error) {
            console.error("거부 실패:", error);
        }
    }

    const handleUpdate = async () => {
        if (!editingUser) return;

        try {
            await updateUserInfo(editingUser.userId, editingUser);
            alert('사용자가 수정되었습니다.');
            setEditingUser(null); // 수정 모드 종료
            await fetchData();
        } catch (error) {
            console.error("수정 실패: ", error);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                {/* Tailwind CSS 스피너 / Loading Bar */}
                <div
                    className="w-16 h-16 border-4 border-black opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400"> 잠시만 기다려주세요!</div>
            </div>
        );
    }

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">홈</h1>
            <div className="space-y-4">
                <div>회원가입 된 사용자</div>
                {userList.length > 0 ? (
                    userList.map(user =>
                        <div key={user.userId}>
                            <span>{user.userId}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setEditingUser({...user, password: null})}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                >
                                    수정
                                </button>
                            </div>
                        </div>)
                ) : (
                    <p className="text-gray-400 text-center">회원가입 된 사용자가 없습니다.</p>
                )}
                <div>----------------------------------------------------</div>
                <div>회원가입 요청한 사용자</div>
                {nonuserList.length > 0 ? (
                    nonuserList.map(nonuser => <div key={nonuser.userId}>
                        <span>{nonuser.userId}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleAccept(nonuser.userId)}
                                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                            >
                                승인
                            </button>
                            <button
                                onClick={() => handleReject(nonuser.userId)}
                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                거부
                            </button>
                        </div>
                    </div>)
                ) : (
                    <p className="text-gray-400 text-center">회원가입 한 사용자가 없습니다.</p>
                )}
            </div>

            {/* 사용자 정보 수정 폼 */}
            {editingUser && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 w-96">
                        <h2 className="text-2xl font-semibold">사용자 정보 수정</h2>
                        <input
                            type="text"
                            placeholder="이름"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                            >
                                저장
                            </button>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PostContainer>
    );
};

export default Admin;
