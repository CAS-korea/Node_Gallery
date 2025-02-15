"use client"

import type React from "react"
import { useState, useEffect } from "react"
import PostContainer from "../../components/Container"
import {
    User,
    MessageSquare,
    LogOut,
    Moon,
    Sun,
    Bell,
    Info,
    FileText,
    ChevronRight,
    ChevronDown,
} from "lucide-react"

const Settings: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // 다크모드 적용 (Tailwind의 dark 모드를 사용한다고 가정)
    // tailwind.config.js에서 darkMode: 'class'로 설정되어 있어야 합니다.
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        // 실제 다크모드 스타일은 위 useEffect나 글로벌 CSS에서 처리
    }

    return (
        <PostContainer>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-8 text-gray-800">설정</h1>

                <div className="space-y-6">
                    {/* 개인정보 수정 섹션 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
                        >
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-3 text-gray-500" />
                                <span className="font-medium text-gray-800">개인정보 수정</span>
                            </div>
                            {isPersonalInfoOpen ? (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        {isPersonalInfoOpen && (
                            <div className="px-6 py-4 bg-gray-50 space-y-3">
                                <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700">
                                    아이디 변경
                                </button>
                                <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700">
                                    비밀번호 변경
                                </button>
                                <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700">
                                    이메일 변경
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 기타 설정 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 transition-colors">
                            <MessageSquare className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="font-medium text-gray-800">문의 내용 남기기</span>
                        </button>
                        <div className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                {isDarkMode ? (
                                    <Moon className="w-5 h-5 mr-3 text-gray-500" />
                                ) : (
                                    <Sun className="w-5 h-5 mr-3 text-gray-500" />
                                )}
                                <span className="font-medium text-gray-800">다크모드</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 transition-colors">
                            <Bell className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="font-medium text-gray-800">알림 설정</span>
                        </button>
                    </div>

                    {/* 웹 정보 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="w-full px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <Info className="w-5 h-5 mr-3 text-gray-500" />
                                <span className="font-medium text-gray-800">웹 버전</span>
                            </div>
                            <span className="text-gray-500">1.0.0</span>
                        </div>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 transition-colors">
                            <FileText className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="font-medium text-gray-800">개인정보 처리방침</span>
                        </button>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 transition-colors">
                            <FileText className="w-5 h-5 mr-3 text-gray-500" />
                            <span className="font-medium text-gray-800">서비스 이용약관</span>
                        </button>
                    </div>

                    {/* 회원탈퇴 버튼 (제일 아래에 배치) */}
                    <div>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="w-full px-6 py-4 bg-red-500 flex items-center text-left rounded-2xl hover:bg-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3 text-white" />
                            <span className="font-medium text-white">회원탈퇴</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 회원탈퇴 모달 */}
            {isDeleteModalOpen && (
                <DeleteAccountModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </PostContainer>
    )
}

const DeleteAccountModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
                                                                                    isOpen,
                                                                                    onClose,
                                                                                }) => {
    const [isChecked, setIsChecked] = useState(false)

    if (!isOpen) return null

    const handleConfirm = () => {
        // 실제 회원탈퇴 로직을 여기에 추가하세요.
        alert("회원 탈퇴가 완료되었습니다.")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4">정말로 탈퇴하시겠습니까?</h2>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-gray-700">탈퇴 확인 </span>
                    </label>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!isChecked}
                        className={`px-4 py-2 rounded ${
                            isChecked
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-red-300 text-white cursor-not-allowed"
                        }`}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
