// AnimatedCharacter.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCharacterProps {
    targetPos: { x: number; y: number } | null;
    isPasswordFocused: boolean;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ targetPos, isPasswordFocused }) => {
    const leftEyeRef = useRef<HTMLDivElement>(null);
    const rightEyeRef = useRef<HTMLDivElement>(null);
    const [leftPupilOffset, setLeftPupilOffset] = useState({ x: 0, y: 0 });
    const [rightPupilOffset, setRightPupilOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!targetPos) {
            setLeftPupilOffset({ x: 0, y: 0 });
            setRightPupilOffset({ x: 0, y: 0 });
            return;
        }
        const computePupilOffset = (eyeRef: React.RefObject<HTMLDivElement>) => {
            if (!eyeRef.current) return { x: 0, y: 0 };
            const rect = eyeRef.current.getBoundingClientRect();
            const eyeCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            let dx = targetPos.x - eyeCenter.x;
            let dy = targetPos.y - eyeCenter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxOffset = 6; // 최대 이동 거리 (픽셀)
            if (distance > maxOffset) {
                const ratio = maxOffset / distance;
                dx *= ratio;
                dy *= ratio;
            }
            return { x: dx, y: dy };
        };

        setLeftPupilOffset(computePupilOffset(leftEyeRef));
        setRightPupilOffset(computePupilOffset(rightEyeRef));
    }, [targetPos]);

    return (
        <div className="relative w-64 h-64 mx-auto">
            {/* 귀 (Ears) */}
            <div
                className="absolute rounded-full bg-orange-300 shadow-lg"
                style={{
                    width: '40px',
                    height: '40px',
                    top: '0%',
                    left: '10%',
                    transform: 'rotate(-20deg)',
                }}
            ></div>
            <div
                className="absolute rounded-full bg-orange-300 shadow-lg"
                style={{
                    width: '40px',
                    height: '40px',
                    top: '0%',
                    right: '10%',
                    transform: 'rotate(20deg)',
                }}
            ></div>

            {/* 얼굴 (Face) */}
            <div className="absolute inset-0 rounded-full bg-orange-300 shadow-xl"></div>

            {/* 왼쪽 눈 (Left Eye) - 위치 조정 */}
            <div
                ref={leftEyeRef}
                className="absolute"
                style={{
                    top: '32%',   // 원래 30%에서 40%로 조정하여 좀 더 아래쪽에 위치
                    left: '24%',  // 20%에서 25%로 조정하여 중앙에 가깝게 배치
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {isPasswordFocused ? (
                    <div
                        className="w-full h-full bg-orange-300"
                        style={{ position: 'absolute', top: '0%', left: 0 }}
                    ></div>
                ) : (
                    <motion.div
                        className="rounded-full bg-black"
                        style={{
                            width: '50%',
                            height: '50%',
                            position: 'absolute',
                            top: '25%',
                            left: '25%',
                        }}
                        animate={{ x: leftPupilOffset.x, y: leftPupilOffset.y }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {/* 왼쪽 눈의 반짝이는 하이라이트 */}
                        <motion.div
                            className="rounded-full bg-white"
                            style={{
                                width: '6px',
                                height: '6px',
                                position: 'absolute',
                                top: '2px',
                                left: '2px',
                            }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                )}
            </div>

            {/* 오른쪽 눈 (Right Eye) - 위치 조정 */}
            <div
                ref={rightEyeRef}
                className="absolute"
                style={{
                    top: '16%',   // 조정: 40%
                    left: '60%', // 조정: 25%
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {isPasswordFocused ? (
                    <div
                        className="w-full h-full bg-orange-300"
                        style={{ position: 'absolute', top: '0%', left: 0 }}
                    ></div>
                ) : (
                    <motion.div
                        className="rounded-full bg-black"
                        style={{
                            width: '50%',
                            height: '50%',
                            position: 'absolute',
                            top: '25%',
                            left: '25%',
                        }}
                        animate={{ x: rightPupilOffset.x, y: rightPupilOffset.y }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {/* 오른쪽 눈의 반짝이는 하이라이트 */}
                        <motion.div
                            className="rounded-full bg-white"
                            style={{
                                width: '6px',
                                height: '6px',
                                position: 'absolute',
                                top: '2px',
                                left: '2px',
                            }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                )}
            </div>

            {/* 코 (Nose) */}
            <div
                className="absolute"
                style={{
                    top: '55%',
                    left: '50%',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    transform: 'translate(-50%, -50%)',
                }}
            ></div>

            {/* 혓바닥 (Tongue) */}
            <div
                className="absolute"
                style={{
                    top: '72%',
                    left: '50%',
                    width: '25px',
                    height: '12px',
                    backgroundColor: '#FF6666',
                    borderRadius: '12px',
                    transform: 'translate(-50%, -50%)',
                }}
            ></div>
        </div>
    );
};

export default AnimatedCharacter;
