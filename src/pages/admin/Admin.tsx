import React, { useCallback, useEffect, useState } from 'react';
import PostContainer from "../../components/Container";
import { useServices } from "../../context/ServicesProvider.tsx";
import { UserEntity } from "../../types/UserEntity.ts";

const Admin: React.FC = () => {
    const { authorizeUser, getNonuserList, getUserList, updateUserInfo, banUser } = useServices();

    // 폼 종류 구분
    const [editMode, setEditMode] = useState<'update' | 'ban' | null>(null);

    // 상태 관리
    const [userList, setUserList] = useState<UserEntity[]>([]);
    const [nonuserList, setNonuserList] = useState<UserEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingUser, setEditingUser] = useState<UserEntity | null>(null);
    const [banDays, setBanDays] = useState<number>(0);

    const fetchData = useCallback(async () => {
        try {
            const users = await getUserList();
            const nonUsers = await getNonuserList();
            setUserList(users);
            setNonuserList(nonUsers);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    }, [getUserList, getNonuserList]);

    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setLoading(false);
        }, 500);
    }, [fetchData]);

    const formatRemainingTime = (bannedUntil: string): string => {
        const now = new Date().getTime();
        const banEndDate = new Date(bannedUntil).getTime();
        const diff = banEndDate - now;
        if (diff <= 0) return "0";
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        if (hours < 1) return "1시간 이내";
        if (days < 1) return `${hours}시간`;
        return `${days}일 ${remainingHours}시간`;
    };

    // 사용자 승인 처리
    const handleAccept = async (userId: string) => {
        try {
            await authorizeUser(userId, 'accept');
            alert('사용자가 승인되었습니다.');
            await fetchData();
        } catch (error) {
            console.error("승인 실패:", error);
        }
    };

    // 사용자 거부 처리
    const handleReject = async (userId: string) => {
        try {
            await authorizeUser(userId, 'reject');
            alert('사용자가 거부되었습니다.');
            await fetchData();
        } catch (error) {
            console.error("거부 실패:", error);
        }
    };

    // 사용자 정보 수정 처리
    const handleUpdate = async () => {
        if (!editingUser) return;
        try {
            await updateUserInfo(editingUser.userId, editingUser);
            alert('사용자 정보가 수정되었습니다.');
            setEditingUser(null);
            await fetchData();
        } catch (error) {
            console.error("수정 실패: ", error);
        }
    };


    // 사용자 밴 처리
    const handleBan = async (days: number) => {
        if (!editingUser || days <= 0) {
            alert('유효한 정지 기간을 입력해 주세요.');
            return;
        }
        try {
            await banUser(editingUser.userId, days);
            alert(`사용자가 ${days}일 정지되었습니다.`);
            setEditingUser(null);
            setBanDays(0);
            await fetchData();
        } catch (error) {
            console.error("정지 실패: ", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="w-16 h-16 border-4 border-black dark:border-white opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400 dark:text-gray-300">
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                관리자 페이지
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 가입된 사용자 목록 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        가입된 사용자
                    </h2>
                    {userList.length > 0 ? (
                        <div className="overflow-auto max-h-80">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-2 px-3 text-gray-600 dark:text-gray-300 font-medium">
                                        유저ID
                                    </th>
                                    <th className="py-2 px-3 text-gray-600 dark:text-gray-300 font-medium">
                                        작업
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList.map((user) => (
                                    <tr
                                        key={user.userId}
                                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="py-2 px-3 text-gray-700 dark:text-gray-200">
                                            {user.userId}
                                        </td>
                                        <td className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    // 기존 수정 시 password는 제외
                                                    setEditingUser({ ...user, password: null });
                                                    setEditMode('update');
                                                }}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingUser({ ...user, password: null });
                                                    setEditMode('ban');
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                활동 정지
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-center py-4">
                            가입된 사용자가 없습니다.
                        </p>
                    )}
                </div>

                {/* 가입 요청 사용자 목록 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        가입 요청 사용자
                    </h2>
                    {nonuserList.length > 0 ? (
                        <div className="overflow-auto max-h-80">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-2 px-3 text-gray-600 dark:text-gray-300 font-medium">
                                        유저ID
                                    </th>
                                    <th className="py-2 px-3 text-gray-600 dark:text-gray-300 font-medium">
                                        작업
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {nonuserList.map((nonuser) => {
                                    const remainingDays = nonuser.bannedUntil
                                        ? formatRemainingTime(nonuser.bannedUntil)
                                        : '';
                                    return (
                                        <tr
                                            key={nonuser.userId}
                                            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="py-2 px-3 text-gray-700 dark:text-gray-200">
                                                {nonuser.userId}
                                                {!nonuser.isAuthorized && remainingDays && (
                                                    <span className="ml-2 text-red-500">(-{remainingDays})</span>
                                                )}
                                                {!nonuser.isAuthorized && !remainingDays && (
                                                    <span className="ml-2 text-red-500">(NEW!)</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-3">
                                                <div className="flex space-x-2">
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
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500 text-center py-4">
                            가입 요청 사용자가 없습니다.
                        </p>
                    )}
                </div>
            </div>

            {/* 사용자 정보 수정 모달 */}
            {editingUser && editMode === 'update' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-black/70 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-96 space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
                            사용자 정보 수정
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
                                    placeholder="이름"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    전화번호
                                </label>
                                <input
                                    type="tel"
                                    value={editingUser.phoneNumber || ""}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, phoneNumber: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
                                    placeholder="전화번호"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    학번
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.studentNumber || ""}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, studentNumber: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
                                    placeholder="학번"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    이메일
                                </label>
                                <input
                                    type="email"
                                    value={editingUser.email || ""}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, email: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
                                    placeholder="이메일"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
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

            {/* 사용자 활동 정지 모달 */}
            {editingUser && editMode === 'ban' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-black/70 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-96 space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
                            사용자 활동 정지
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                정지 기간(일)
                            </label>
                            <input
                                type="number"
                                value={banDays}
                                onChange={(e) => setBanDays(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
                                placeholder="정지 기간"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                onClick={() => handleBan(banDays)}
                                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                            >
                                저장
                            </button>
                            <button
                                onClick={() => {
                                    setEditingUser(null);
                                    setBanDays(0);
                                }}
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
