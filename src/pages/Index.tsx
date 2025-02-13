import React from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useInView } from 'react-intersection-observer';
import './Index.css';

// 각 섹션별 애니메이션 Variants
const heroVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: 'easeOut' }
    },
};

const MovingBlurBackground: React.FC = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: impactRef, inView: impactInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3, triggerOnce: false });

    return (
        // 최상위 컨테이너에 우주 느낌의 어두운 배경 적용
        <div className="relative bg-gradient-to-t from-gray-800 to-black min-h-screen overflow-y-auto flex flex-col px-16">
            <Header />
            {/* Blob 애니메이션 (배경) - 가장 아래층 */}
            <div className="fixed inset-0 -z-10 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                    <div className="absolute top-0 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* 우주 배경 효과 (별, 행성) - 최상위 div에 적용 */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 기존 별 3개 */}
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '20%', left: '30%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '50%', left: '70%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '80%', left: '40%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* 추가 별 3개 */}
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '10%', left: '80%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '40%', left: '50%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '70%', left: '80%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                />

                {/* 행성 애니메이션 */}
                <motion.div
                    className="absolute"
                    style={{
                        top: '10%',
                        left: '20%',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#facc15',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: 250, y: -150, opacity: 1 }}
                    transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        top: '60%',
                        left: '70%',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#93c5fd',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: -150, y: -100, opacity: 1 }}
                    transition={{ duration: 12, ease: 'linear', repeat: Infinity, repeatType: 'mirror', delay: 1 }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        top: '80%',
                        left: '30%',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#f472b6',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: -200, y: -50, opacity: 1 }}
                    transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror', delay: 2 }}
                />
            </motion.div>

            {/* 메인 콘텐츠 (텍스트, 버튼 등) */}
            <div className="relative z-10 flex flex-col items-center px-8 space-y-12">
                {/* Hero 섹션 */}
                <motion.section
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? 'visible' : 'hidden'}
                    variants={heroVariants}
                    className="min-h-[80vh] flex flex-col justify-center text-center relative overflow-hidden"
                >
                    {/* 회전하는 배경 원 대신 로고 이미지 사용 */}
                    <motion.div
                        className="absolute inset-0 flex justify-center items-center pointer-events-none"
                        initial={{rotate: 0}}
                        animate={{rotate: 360}}
                        transition={{duration: 40, repeat: Infinity, ease: 'linear'}}
                    >
                        <img
                            src="/circle.png"
                            alt="circle"
                            className="w-96 h-96 absolute opacity-50"
                        />
                        <img
                            src="/circle.png"
                            alt="circle"
                            className="w-72 h-72 absolute opacity-25 "
                        />
                        <img
                            src="/circle.png"
                            alt="circle"
                            className="w-52 h-52 absolute opacity-10"
                        />
                    </motion.div>
                    <div className="relative">
                        <img src="/Node_Logo_Refined.png" alt="NODE Logo" className="w-72 mx-auto mt-56 ml-32"/>
                        <h1 className="text-7xl font-serif text-white text-shadow tracking-wide leading-relaxed pt-12">
                            PROJECT : NODE
                        </h1>
                        <h2 className="text-2xl font-bold text-white mb-4">Created by CAS</h2>
                    </div>
                </motion.section>

                {/* Impact 섹션 - heroVariants 사용 */}
                <motion.section
                    ref={impactRef}
                    initial="hidden"
                    animate={impactInView ? 'visible' : 'hidden'}
                    variants={heroVariants}
                    className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    {/* 중앙에서 펼쳐지는 방어막 효과 */}
                    <motion.div
                        className="absolute flex justify-center items-center pointer-events-none"
                        initial={{ scale: 0, opacity: 0.9 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
                    >
                        <div className="w-64 h-64 border-4 border-white rounded-full" />
                    </motion.div>
                    <div className="relative">
                        <h1 className="text-8xl font-extrabold text-white pb-4">
                            "해봐야 안다"
                        </h1>
                        <h1 className="text-2xl font-bold text-white">
                            Give it a shot, then you'll know
                        </h1>
                    </div>
                </motion.section>

                {/* CTA 섹션 - heroVariants 사용 */}
                <motion.section
                    ref={aboutRef}
                    initial="hidden"
                    animate={aboutInView ? "visible" : "hidden"}
                    variants={heroVariants}
                    className="min-h-screen flex flex-col justify-center items-center text-center"
                >
                    <img
                        src="/CASlogo.png"
                        alt="CAS Logo"
                        className="w-96 h-auto object-contain"
                    />
                    <hr className="w-full max-w-2xl border-t-2 border-white my-10"/>
                    <p
                        className="text-lg max-w-2xl mx-auto mb-8 text-white px-4"
                        style={{
                            whiteSpace: 'pre-line',
                            fontFamily: '"Roboto", sans-serif'
                        }}
                    >
                        {`
  Chung-Ang University Artificial Intelligence Seminar (CAS)는 
  AI에 열정을 가진 인재들이 모여 서로의 지식을 나누고 함께 성장하는 공간입니다.
CAS는 AI분야와 다른 분야들을 접목해 무한한 가능성과 창의력을 
탐구하기 위해 만들어진 학회입니다.

직접 부딫히고 경험하며 함꼐 성장하는 문화를 만들어가고자 합니다.

"해봐야 안다."

해보지 않으면 모르는 것이 많습니다. 
CAS와 함께 무엇이든 부딫혀 보며, 새로운 생각의 패러다임을 펼쳐보세요.

끊임없는 도전과 경험을 통해 달라진 자신을 발견하실 수 있을 겁니다.

NODE Project는 학과 내 선배와 후배 간의 단합과 협업을 촉진하여, 창의적이고 혁신적인 아이디어를 실현하는 플랫폼입니다.
  `}
                    </p>

                </motion.section>

                <Footer/>
            </div>
        </div>
    );
};

export default MovingBlurBackground;
