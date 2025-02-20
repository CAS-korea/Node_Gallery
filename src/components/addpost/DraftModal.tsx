import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface Draft {
    id: number;
    title: string;
    createdAt: number;
}

interface DraftModalProps {
    drafts: Draft[];
    onDelete: (id: number) => void;
    onClose: () => void;
    onSaveDraft: () => void;
}

const DraftModal: React.FC<DraftModalProps> = ({ drafts, onDelete, onClose, onSaveDraft }) => {
    const getRemainingDays = (createdAt: number) => {
        const expireTime = 30 * 24 * 60 * 60 * 1000;
        const diff = expireTime - (Date.now() - createdAt);
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">임시저장</h2>
                    {/* 추가하기 버튼 */}
                    <div className="border border-dashed border-gray-400 p-4 rounded-md mb-4 flex justify-center items-center">
                        <button
                            onClick={onSaveDraft}
                            className="w-16 h-16 flex items-center justify-center text-4xl text-gray-500"
                        >
                            +
                        </button>
                    </div>
                    {drafts.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {drafts.map(draft => (
                                <div key={draft.id} className="border rounded-md p-2 relative">
                                    <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-md mb-2 flex items-center justify-center">
                                        <span className="text-sm text-gray-600">썸네일</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                        {draft.title || "제목없음"}
                                    </div>
                                    <div className={`text-xs ${getRemainingDays(draft.createdAt) < 4 ? 'text-red-500' : 'text-gray-600'}`}>
                                        {getRemainingDays(draft.createdAt)}일 남음
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`${draft.title}을 정말로 지우시겠습니까?`)) {
                                                onDelete(draft.id);
                                                alert(`${draft.title}이 성공적으로 삭제되었습니다!`);
                                            }
                                        }}
                                        className="absolute top-2 right-2 text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-4 text-right">
                        <button onClick={onClose} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                            닫기
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DraftModal;
