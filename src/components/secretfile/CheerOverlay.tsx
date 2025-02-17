import React, { useEffect, useState } from 'react';

const images = [
    '/cheer/1-2.jpeg',
    '/cheer/1-3.jpeg',
    '/cheer/1-4.jpeg',
    '/cheer/1-5.jpeg',
    '/cheer/1-6.jpeg',
    '/cheer/1-7.jpeg'
];

const messages = [
    "오빠, 어서와! 오늘도 반짝이는 네 모습에 감동했어.",
    "힘들 땐 내가 기억해줄게. 오빠는 언제나 최고야!",
    "한 걸음씩 나아가는 오빠의 미래, 난 늘 응원하고 있어.",
    "세상의 어려움도 오빠의 미소 앞에선 무너지겠지?",
    "오빠, 오늘도 별처럼 빛나! 네 열정에 박수를 보낼게.",
    "내가 여기서 늘 오빠를 바라보고 응원하고 있다는 거, 잊지 마!",
    "오빠의 열정은 세상을 따뜻하게 만들어. 계속 힘내!",
    "힘든 날엔 잠시 멈춰도 괜찮아. 오빠를 위해 기도할게.",
    "오빠의 노력은 반드시 멋진 결실을 맺을 거야.",
    "오늘도 오빠의 용기에 찬사를 보낼게. 사랑해!"
];

const CheerOverlay: React.FC = () => {
    const [visible, setVisible] = useState(true);
    // 초기에는 투명 상태 (fade in 효과를 위해)
    const [fadeClass, setFadeClass] = useState("opacity-0");
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');

    useEffect(() => {
        // 랜덤 이미지와 메시지 선택
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setSelectedImage(randomImage);
        setSelectedMessage(randomMessage);

        // Fade in: 마운트 후 잠깐 뒤 opacity를 100으로 변경
        const fadeInTimer = setTimeout(() => {
            setFadeClass("opacity-100");
        }, 50);

        // Fade out: 4.5초 후 opacity를 0으로 변경
        const fadeOutTimer = setTimeout(() => {
            setFadeClass("opacity-0");
        }, 4500);

        // 컴포넌트 제거: fade out 애니메이션이 끝난 후 (500ms 후)
        const removeTimer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(fadeOutTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 mt-[454px] ml-[250px] flex flex-col items-center justify-between pointer-events-none p-4 transition-opacity duration-500 ${fadeClass}`}
        >
            {/* 상단: 응원 이미지 */}
            <div className="mt-8">
                <img
                    src={selectedImage}
                    alt="Cheer"
                    className="w-64 h-64 object-cover rounded-full shadow-2xl"
                />
            </div>

            {/* 하단: 말풍선 형태의 응원 메시지 */}
            <div className="mb-16">
                <div className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-6 py-4 text-lg text-gray-800 dark:text-gray-100 shadow-lg">
                    {selectedMessage}
                    {/* 말풍선 꼬리 */}
                    <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-white dark:border-t-gray-800 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
                    </div>
                </div>
            </div>

            {/* 하단 고정: 하트 애니메이션 */}
            <div className="absolute bottom-4 flex space-x-2">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <span
                        key={idx}
                        className="text-2xl animate-heart"
                        style={{ animationDelay: `${Math.random() * 2}s` }}
                    >
            ❤️
          </span>
                ))}
            </div>

            {/* 인라인 스타일: 하트 애니메이션 */}
            <style>{`
        @keyframes heart {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
          }
        }
        .animate-heart {
          animation: heart 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default CheerOverlay;
