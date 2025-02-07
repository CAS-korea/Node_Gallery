import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCharacterProps {
    targetPos: { x: number; y: number } | null;
    isPasswordFocused: boolean;
    isAngry: boolean;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ targetPos, isPasswordFocused, isAngry }) => {
    const leftEyeRef = useRef<HTMLDivElement>(null);
    const rightEyeRef = useRef<HTMLDivElement>(null);
    const [leftPupilOffset, setLeftPupilOffset] = useState({ x: 0, y: 0 });
    const [rightPupilOffset, setRightPupilOffset] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [idleMousePos, setIdleMousePos] = useState<{ x: number; y: number }>({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });

    // 전역 마우스 무브 이벤트로 idleMousePos 업데이트 (입력 포커스가 없을 때 사용)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIdleMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 깜박임 효과: 5초마다 150ms 동안 눈을 감음
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, 5000);
        return () => clearInterval(blinkInterval);
    }, []);

    // 타깃 좌표에 따른 눈동자 이동 계산 (targetPos가 없으면 idleMousePos 사용)
    useEffect(() => {
        const effectiveTarget = targetPos || idleMousePos;
        if (!effectiveTarget) {
            setLeftPupilOffset({ x: 0, y: 0 });
            setRightPupilOffset({ x: 0, y: 0 });
            return;
        }
        const computePupilOffset = (eyeRef: React.RefObject<HTMLDivElement>) => {
            if (!eyeRef.current) return { x: 0, y: 0 };
            const rect = eyeRef.current.getBoundingClientRect();
            const eyeCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            let dx = effectiveTarget.x - eyeCenter.x;
            let dy = effectiveTarget.y - eyeCenter.y;
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
    }, [targetPos, idleMousePos]);

    // 눈썹 애니메이션: angry가 우선, 그 외에는 isPasswordFocused에 따라 애니메이션
    const leftEyebrowAnimation = isAngry
        ? { rotate: 25, y: 10 }
        : isPasswordFocused
            ? { rotate: -15, y: 5 }
            : { rotate: 0, y: 0 };

    const rightEyebrowAnimation = isAngry
        ? { rotate: -25, y: 10 }
        : isPasswordFocused
            ? { rotate: 15, y: 5 }
            : { rotate: 0, y: 0 };

    return (
        <div className="relative w-64 h-64 mx-auto">
            {/* 왼쪽 눈썹 */}
            <motion.div
                className="absolute"
                animate={leftEyebrowAnimation}
                transition={{ duration: 0.2 }}
                style={{
                    top: '26%',
                    left: '18%',
                    width: '50px',
                    height: '6px',
                    backgroundColor: '#333',
                    borderRadius: '3px',
                }}
            />

            {/* 오른쪽 눈썹 */}
            <motion.div
                className="absolute"
                animate={rightEyebrowAnimation}
                transition={{ duration: 0.2 }}
                style={{
                    top: '20%',
                    left: '57%',
                    width: '50px',
                    height: '6px',
                    backgroundColor: '#333',
                    borderRadius: '3px',
                }}
            />

            {/* 왼쪽 눈 */}
            <div
                ref={leftEyeRef}
                className="absolute shadow-lg"
                style={{
                    top: '34%',
                    left: '17%',
                    width: '55px',
                    height: '40px',
                    borderRadius: '90%',
                    background: 'linear-gradient(135deg, #ffffff, #e0f7fa)',
                    border: '2px solid black',
                    overflow: 'hidden',
                    position: 'relative',
                    opacity: '80%'
                }}
            >
                {/* 깜박임 효과 */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-black"
                    animate={{ height: isBlinking ? '100%' : '0%' }}
                    transition={{ duration: 0.35 }}
                    style={{ zIndex: 4 }}
                />
                {isPasswordFocused ? (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
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
                        {/* 하이라이트 */}
                        <motion.div
                            className="rounded-full bg-white"
                            style={{
                                width: '8px',
                                height: '8px',
                                position: 'absolute',
                                top: '2px',
                                left: '2px',
                            }}
                        />
                    </motion.div>
                )}
            </div>

            {/* 오른쪽 눈 */}
            <div
                ref={rightEyeRef}
                className="absolute shadow-lg"
                style={{
                    top: '15%',
                    left: '57%',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffffff, #e0f7fa)',
                    border: '2px solid black',
                    overflow: 'hidden',
                    position: 'relative',
                    opacity: '80%'
                }}
            >
                {/* 깜박임 효과 */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-black"
                    animate={{ height: isBlinking ? '100%' : '0%' }}
                    transition={{ duration: 0.35 }}
                    style={{ zIndex: 4 }}
                />
                {isPasswordFocused ? (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
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
                        {/* 하이라이트 */}
                        <motion.div
                            className="rounded-full bg-white"
                            style={{
                                width: '8px',
                                height: '8px',
                                position: 'absolute',
                                top: '2px',
                                left: '2px',
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AnimatedCharacter;
