// MovingBlurBackground.tsx
import React from 'react';
import './Index.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// 애니메이션 Variants (보일 때와 안 보일 때)
const fadeVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const MovingBlurBackground: React.FC = () => {
    // 각 섹션별 Intersection Observer 설정 (threshold와 triggerOnce: false로 스크롤 시마다 변화)
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: impactRef, inView: impactInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3, triggerOnce: false });

    return (
        <div className="bg-gray-50 min-h-screen overflow-y-auto flex flex-col px-16 relative">
            <Header />

            {/* 배경 블롭 애니메이션 */}
            <div className="fixed inset-0 z-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center px-8">

                {/* Hero 섹션: 로고와 CAS 소개 */}
                <motion.section
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center text-center"
                >
                    {/* 로고 이미지 */}
                    <img src="/Node_Logo_Refined.png" alt="NODE Logo" className="w-80 mx-auto mb-2"/>
                    <h1 className="text-7xl font-serif text-black text-shadow tracking-wide leading-relaxed">
                        Welcome to CAS
                    </h1>
                    <h2 className="text-2xl font-bold text-black mb-4">PROJECT: NODE</h2>
                </motion.section>

                <motion.section
                    ref={impactRef}
                    initial="hidden"
                    animate={impactInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center items-center text-center"
                >
                    <img src="/chill.png" alt="Chillguy" className="w-80 mx-auto mb-2"/>
                    <h1 className="text-8xl font-extrabold text-black pb-4">
                        "해봐야 안다"
                    </h1>
                    <h1 className="text-2xl font-bold text-black">
                        Give it a shot, then you'll know
                    </h1>
                </motion.section>

                {/* About 섹션: 학회 및 프로젝트 소개 */}
                <motion.section
                    ref={aboutRef}
                    initial="hidden"
                    animate={aboutInView ? "visible" : "hidden"}
                    variants={fadeVariant}
                    className="min-h-screen flex flex-col justify-center text-center"
                >
                    <img src="/CASlogo.png" alt="CASLogo" className="w-80 mx-auto mb-2"/>
                    <p
                        className="text-lg max-w-2xl mx-auto mb-8 text-black px-4"
                        style={{whiteSpace: 'pre-line'}}
                    >
                        {`Chung-Ang University Artificial Intelligence Seminar (CAS)는 
                        AI에 열정을 가진 인재들이 모여 서로의 지식을 나누고 함께 성장하는 공간입니다.
CAS는 AI분야와 다른 분야들을 접목해 무한한 가능성과 창의력을 
탐구하기 위해 만들어진 학회입니다.

직접 부딫히고 경험하며 함꼐 성장하는 문화를 만들어가고자 합니다.

"해봐야 안다."

해보지 않으면 모르는 것이 많습니다. 
CAS와 함께 무엇이든 부딫혀 보며, 새로운 생각의 패러다임을 펼펴보세요.

끊임없는 도전과 경험을 통해 달라진 자신을 발견하실 수 있을 겁니다.

NODE Project는 학과 내 선배와 후배 간의 단합과 협업을 촉진하여, 창의적이고 혁신적인 아이디어를 실현하는 플랫폼입니다.`}
                    </p>

                </motion.section>

                <Footer/>
            </div>
        </div>
    );
};

export default MovingBlurBackground;
