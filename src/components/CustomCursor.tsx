// CustomCursor.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    // 마우스 포인터 위치 상태 (초기값은 화면 밖)
    const [position, setPosition] = useState({ x: -100, y: -100 });
    // 인터랙티브 요소 위에 있을 때 상태
    const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
    // 클릭 상태
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        // 기본 커서를 숨김
        document.body.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            if (target.closest('button, a, .interactive')) {
                setIsHoveringInteractive(true);
            } else {
                setIsHoveringInteractive(false);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto';
        };
    }, []);

    // 기본 크기를 고정 (20px)
    const baseSize = 20;
    // 상태에 따라 scale 값을 조정: 기본 1, 인터랙티브 위에서는 2, 클릭 시에는 3
    const scale = isClicked ? 3 : isHoveringInteractive ? 2 : 1;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] "
            style={{
                width: baseSize,
                height: baseSize,
                border: '2px solid #000', // 검은색 테두리
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }}
            animate={{
                // x, y, scale을 하나의 transform으로 통합
                x: position.x - baseSize / 2,
                y: position.y - baseSize / 2,
                scale: scale,
            }}
            transition={{
                // x, y는 즉시 업데이트
                x: { type: 'tween', duration: 0 },
                y: { type: 'tween', duration: 0 },
                // scale은 spring 애니메이션으로 부드럽게 변화
                scale: { type: 'spring', stiffness: 400, damping: 75, bounce: 5.8 },
            }}
        />
    );
};

export default CustomCursor;
