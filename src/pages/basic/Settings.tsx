"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import PostContainer from "../../components/postcard/Container.tsx"
import { useTheme } from "../../layouts/ThemeContext" // 전역 다크모드 컨텍스트

const Settings: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme() // 전역 테마에서 상태 및 토글 함수 가져오기
    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false) // 탈퇴 완료 모달

    return (
        <PostContainer>
            <motion.div
                initial={{ opacity: 0.5, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">설정</h1>

                <div className="space-y-6">
                    {/* 개인정보 수정 섹션 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <button
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
                        >
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                                <span className="font-medium text-gray-800 dark:text-gray-100">
                                    개인정보 수정
                                </span>
                            </div>
                            {isPersonalInfoOpen ? (
                                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            )}
                        </button>
                        <AnimatePresence>
                            {isPersonalInfoOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="px-6 bg-gray-50 dark:bg-gray-700 overflow-hidden"
                                >
                                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200">
                                        아이디 변경
                                    </button>
                                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200">
                                        비밀번호 변경
                                    </button>
                                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200">
                                        이메일 변경
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 기타 설정 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <MessageSquare className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                문의 내용 남기기
                            </span>
                        </button>
                        <div className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center">
                                {isDarkMode ? (
                                    <Moon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                                ) : (
                                    <Sun className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                                )}
                                <span className="font-medium text-gray-800 dark:text-gray-100">다크모드</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300 after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Bell className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                            <span className="font-medium text-gray-800 dark:text-gray-100">알림 설정</span>
                        </button>
                    </div>

                    {/* 웹 정보 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="w-full px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <Info className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                                <span className="font-medium text-gray-800 dark:text-gray-100">웹 버전</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-300">1.0.0</span>
                        </div>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <FileText className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                개인정보 처리방침
                            </span>
                        </button>
                        <button className="w-full px-6 py-4 flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <FileText className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300" />
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                서비스 이용약관
                            </span>
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
            </motion.div>

            {/* 회원탈퇴 모달 */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <DeleteAccountModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onComplete={() => setIsCompleteModalOpen(true)} // 완료 모달 표시
                    />
                )}
            </AnimatePresence>

            {/* 탈퇴 완료 모달 */}
            <AnimatePresence>
                {isCompleteModalOpen && (
                    <CompleteModal
                        onClose={() => setIsCompleteModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </PostContainer>
    )
}

/** 탈퇴 완료 모달 (예: Alert 대체) */
const CompleteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-black">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full p-6"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    회원 탈퇴가 완료되었습니다!
                </h2>
                <p className="text-gray-700 dark:text-gray-200">
                    그동안 이용해주셔서 감사합니다.
                </p>
                <div className="flex justify-end space-x-3 mt-4">
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        확인
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}

const DeleteAccountModal: React.FC<{
    isOpen: boolean
    onClose: () => void
    onComplete: () => void
}> = ({ isOpen, onClose, onComplete }) => {
    const [isChecked, setIsChecked] = useState(false)

    if (!isOpen) return null

    const handleConfirm = () => {
        // 실제 회원탈퇴 로직을 여기에 추가하세요.
        //alert("회원 탈퇴가 완료되었습니다.")
        onClose()
        onComplete() // 커스텀 완료 모달 표시
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-black/70">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    정말로 탈퇴하시겠습니까?
                </h2>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-gray-700 dark:text-gray-100">탈퇴 확인</span>
                    </label>
                </div>
                <div className="flex justify-end space-x-3">
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        취소
                    </motion.button>
                    <motion.button
                        onClick={handleConfirm}
                        disabled={!isChecked}
                        whileHover={{ scale: isChecked ? 1.05 : 1 }}
                        whileTap={{ scale: isChecked ? 0.95 : 1 }}
                        className={`px-4 py-2 rounded ${
                            isChecked
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-red-300 text-white cursor-not-allowed"
                        }`}
                    >
                        확인
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}

export default Settings
