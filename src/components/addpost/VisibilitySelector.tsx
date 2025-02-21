import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postVisibility } from '../../types/PostDto.ts';

interface VisibilitySelectorProps {
    value: postVisibility;
    onChange: (value: postVisibility) => void;
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const options: postVisibility[] = ['PUBLIC', 'PRIVATE', 'FOLLOWERS_ONLY'];
    const toggle = () => setOpen(prev => !prev);
    const handleSelect = (val: postVisibility) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className="relative">
            <motion.button
                onClick={toggle}
                className="px-8 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {value === 'PUBLIC' ? '공개' : value === 'PRIVATE' ? '비공개' : '팔로워만'}
            </motion.button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10"
                    >
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleSelect(opt)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {opt === 'PUBLIC' ? '공개' : opt === 'PRIVATE' ? '비공개' : '팔로워만'}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VisibilitySelector;
