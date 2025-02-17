import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const images = [
    '/cheer/1-2.jpeg',
    '/cheer/1-3.jpeg',
    '/cheer/1-4.jpeg',
    '/cheer/1-5.jpeg',
    '/cheer/1-6.jpeg',
    '/cheer/1-7.jpeg'
];

const messages = [
    "오빠, 오늘 하루도 수고 많았어. 너의 미소가 내 힘이 돼.",
    "내 마음 속에 오빠가 제일 소중해. 언제나 사랑하고 응원해!",
    "오빠가 웃을 때마다 내 세상은 환해져. 사랑해!",
    "힘들 땐 내 어깨를 빌려줄게. 오뻐는 내 전부야.",
    "오빠..! 오빠의 작은 노력 하나하나가 나를 설레게 해. 항상 고마워.",
    "오빠의 따뜻한 눈빛 하나면 내 모든 고민이 사라져. ㅎ..",
    "내 마음은 오빠에게만 있어. 오늘도 행복하길 바라! 사랑해 <3",
    "오빠, 오빠의 웃는 모습이 내 하루의 가장 큰 기쁨이야. 헤헤..",
    "오빠, 언제나 오빠 곁에서 응원할게. 힘내!",
    "오빠 자체만으로두 나에게 가장 큰 위로야. 오빠, 사랑해!"
];

const CheerOverlay: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');

    useEffect(() => {
        // 랜덤 이미지와 메시지 선택
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setSelectedImage(randomImage);
        setSelectedMessage(randomMessage);

        // 500ms 후 등장
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        // 총 5.5초 후 (애니메이션 포함) 퇴장 처리
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 5500);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div className="relative flex flex-col items-center">
                        {/* 이미지 영역 */}
                        <div className="relative w-64 h-64 overflow-hidden rounded-full shadow-2xl">
                            <motion.img
                                src={selectedImage}
                                alt="Cheer"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", duration: 0.8 }}
                            />
                        </div>

                        {/* 말풍선 영역 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="relative -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-sm text-gray-800 dark:text-gray-100 shadow-lg"
                        >
                            <div className=" font-semibold flex items-center">
                                오빠~! 어서와
                                <motion.span
                                    initial={{ y: 0, opacity: 0, scale: 0 }}
                                    animate={{ y: -10, opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, y: 0, scale: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="ml-1 mt-2 text-2xl"
                                >
                                    ❤️
                                </motion.span>
                            </div>
                            {selectedMessage}
                            {/* 말풍선 꼬리 */}
                            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[10px] border-t-white dark:border-t-gray-800 border-l-6 border-l-transparent border-r-6 border-r-transparent"></div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CheerOverlay;
