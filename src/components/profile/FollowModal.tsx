"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export interface FollowUser {
    id: number;
    name: string;
    image: string;
}

interface FollowModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    users: FollowUser[];
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

const FollowModal: React.FC<FollowModalProps> = ({ isOpen, onClose, title, users }) => {
    if (!isOpen) return null;
    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
                        <X size={20} />
                    </button>
                </div>
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user.id} className="flex items-center space-x-3">
                            <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default FollowModal;
