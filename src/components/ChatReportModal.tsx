"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

type Phase = "selectReason" | "confirmReason" | "reported";

const ChatReportModal: React.FC<ReportModalProps> = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState<string>("불건전한 내용");
    const [customReason, setCustomReason] = useState("");
    const [phase, setPhase] = useState<Phase>("selectReason");

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value);
        if (e.target.value !== "기타") {
            setCustomReason("");
        }
    };

    const handleConfirmSelectReason = () => {
        setPhase("confirmReason");
    };

    const handleYes = () => {
        setPhase("reported");
    };

    const handleNo = () => {
        setPhase("selectReason");
    };

    const handleCloseFinal = () => {
        const finalReason = reason === "기타" ? customReason : reason;
        onConfirm(finalReason || "기타");
        setPhase("selectReason");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {phase === "selectReason" && (
                    <motion.div
                        key="selectReason"
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            이 채팅을 신고하시겠습니까?
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">사유를 알려주세요!</p>
                        <div className="space-y-2 mb-4">
                            {/* 불건전한 내용 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="불건전한 내용"
                                    checked={reason === "불건전한 내용"}
                                    onChange={handleRadioChange}
                                    className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-sm cursor-pointer transition-colors checked:bg-red-500 checked:border-red-500 focus:ring-2 focus:ring-offset-1 focus:ring-red-300"
                                />
                                <span className="text-gray-700 dark:text-gray-200">불건전한 내용</span>
                            </label>

                            {/* 정치적인 내용 포함 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="정치적인 내용 포함"
                                    checked={reason === "정치적인 내용 포함"}
                                    onChange={handleRadioChange}
                                    className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-sm cursor-pointer transition-colors checked:bg-red-500 checked:border-red-500 focus:ring-2 focus:ring-offset-1 focus:ring-red-300"
                                />
                                <span className="text-gray-700 dark:text-gray-200">정치적인 내용 포함</span>
                            </label>

                            {/* 기타 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="기타"
                                    checked={reason === "기타"}
                                    onChange={handleRadioChange}
                                    className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-sm cursor-pointer transition-colors checked:bg-red-500 checked:border-red-500 focus:ring-2 focus:ring-offset-1 focus:ring-red-300"
                                />
                                <span className="text-gray-700 dark:text-gray-200">기타</span>
                            </label>
                            {reason === "기타" && (
                                <motion.div
                                    key="custom-input"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="ml-8 mt-2"
                                >
                                    <input
                                        type="text"
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        placeholder="기타 사유를 입력해주세요"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                                    />
                                </motion.div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                                취소
                            </motion.button>
                            <motion.button
                                onClick={handleConfirmSelectReason}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                확인
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {phase === "confirmReason" && (
                    <motion.div
                        key="confirmReason"
                        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            다음 사유로 신고하시겠습니까?
                        </h2>
                        <p className="text-gray-700 dark:text-gray-200 mb-6">
                            {reason === "기타" && customReason ? customReason : reason}
                        </p>
                        <div className="flex justify-end space-x-2">
                            <motion.button
                                onClick={handleNo}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                                아니요
                            </motion.button>
                            <motion.button
                                onClick={handleYes}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                예
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {phase === "reported" && (
                    <motion.div
                        key="reported"
                        className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            신고 처리 되었습니다.
                        </h2>
                        <p className="text-gray-700 dark:text-gray-200 mb-6">
                            소중한 의견 감사합니다. 관리자가 확인 후 조치 예정입니다.
                        </p>
                        <div className="flex justify-end">
                            <motion.button
                                onClick={handleCloseFinal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                확인
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatReportModal;
