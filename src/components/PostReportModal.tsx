import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ReportModalProps {
    onClose: () => void
    onConfirm: (reason: string) => void
}

type Phase = "selectReason" | "confirmReason" | "reported"

const PostReportModal: React.FC<ReportModalProps> = ({ onClose, onConfirm }) => {
    // 신고 사유
    const [reason, setReason] = useState<string>("불건전한 내용")
    const [customReason, setCustomReason] = useState("")
    // 단계
    const [phase, setPhase] = useState<Phase>("selectReason")

    // 라디오 변경 핸들러
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value)
        if (e.target.value !== "기타") {
            setCustomReason("")
        }
    }

    // 1단계 → 2단계
    const handleConfirmSelectReason = () => {
        setPhase("confirmReason")
    }

    // 2단계 "예" 버튼: 3단계로 전환 (onConfirm 호출은 3단계에서 처리)
    const handleYes = () => {
        setPhase("reported")
    }

    // 2단계 "아니요" 버튼: 1단계로 돌아감
    const handleNo = () => {
        setPhase("selectReason")
    }

    // 3단계 "확인" 버튼: 최종 처리 후 모달 닫기 (여기서 onConfirm 호출)
    const handleCloseFinal = () => {
        const finalReason = reason === "기타" ? customReason : reason
        onConfirm(finalReason || "기타")
        setPhase("selectReason")
        onClose()
    }

    return (
        // (1) 오버레이는 항상 표시
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* (2) 단계별 모달 내용을 AnimatePresence로 제어 */}
            <AnimatePresence mode="wait">
                {phase === "selectReason" && (
                    <motion.div
                        key="selectReason"
                        className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* 1단계: 사유 선택 */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            이 포스트를 신고하시겠습니까?
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">사유를 알려주세요!</p>

                        {/* 라디오 목록 */}
                        <div className="space-y-2 mb-4">
                            {/* 불건전한 내용 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="불건전한 내용"
                                    checked={reason === "불건전한 내용"}
                                    onChange={handleRadioChange}
                                    className={`
                    appearance-none 
                    w-5 h-5 
                    border border-gray-300 
                    rounded-sm 
                    cursor-pointer 
                    transition-colors 
                    checked:bg-red-500 
                    checked:border-red-500 
                    focus:ring-2 focus:ring-offset-1 focus:ring-red-300
                    relative
                    after:content-[''] 
                    after:hidden 
                    checked:after:block 
                    after:absolute 
                    after:inset-0
                    after:text-white 
                    after:text-sm 
                    after:flex 
                    after:items-center 
                    after:justify-end 
                    after:ml-1 
                    checked:after:content-['✓'] 
                  `}
                                />
                                <span className="text-gray-700">불건전한 내용</span>
                            </label>

                            {/* 정치적인 내용 포함 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="정치적인 내용 포함"
                                    checked={reason === "정치적인 내용 포함"}
                                    onChange={handleRadioChange}
                                    className={`
                    appearance-none 
                    w-5 h-5 
                    border border-gray-300 
                    rounded-sm 
                    cursor-pointer 
                    transition-colors 
                    checked:bg-red-500 
                    checked:border-red-500 
                    focus:ring-2 focus:ring-offset-1 focus:ring-red-300
                    relative
                    after:content-[''] 
                    after:hidden 
                    checked:after:block 
                    after:absolute 
                    after:inset-0
                    after:text-white 
                    after:text-sm 
                    after:flex 
                    after:items-center 
                    after:justify-end 
                    after:ml-1 
                    checked:after:content-['✓'] 
                  `}
                                />
                                <span className="text-gray-700">정치적인 내용 포함</span>
                            </label>

                            {/* 기타 */}
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition">
                                <input
                                    type="radio"
                                    name="reportReason"
                                    value="기타"
                                    checked={reason === "기타"}
                                    onChange={handleRadioChange}
                                    className={`
                    appearance-none 
                    w-5 h-5 
                    border border-gray-300 
                    rounded-sm 
                    cursor-pointer 
                    transition-colors 
                    checked:bg-red-500 
                    checked:border-red-500 
                    focus:ring-2 focus:ring-offset-1 focus:ring-red-300
                    relative
                    after:content-[''] 
                    after:hidden 
                    checked:after:block 
                    after:absolute 
                    after:inset-0
                    after:text-white 
                    after:text-sm 
                    after:flex 
                    after:items-center 
                    after:justify-end 
                    after:ml-1 
                    checked:after:content-['✓'] 
                  `}
                                />
                                <span className="text-gray-700">기타</span>
                            </label>

                            {/* 기타 선택 시 텍스트 입력 */}
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                    />
                                </motion.div>
                            )}
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex justify-end space-x-2">
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                        className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* 2단계: [사유]로 신고하시겠습니까? */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            다음 사유로 신고하시겠습니까?
                        </h2>
                        <p className="text-gray-700 mb-6">
                            {reason === "기타" && customReason ? customReason : reason}
                        </p>

                        <div className="flex justify-end space-x-2">
                            <motion.button
                                onClick={handleNo}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                        className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* 3단계: 신고 처리됨 */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            신고 처리 되었습니다.
                        </h2>
                        <p className="text-gray-700 mb-6">
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
    )
}

export default PostReportModal
