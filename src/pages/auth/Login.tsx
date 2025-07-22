// src/pages/auth/Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { ClientUrl } from "../../constants/ClientUrl";
import { useState } from "react";
import { motion } from "framer-motion";
import FloatingInput from "../../components/FloatingInput";

const Login: React.FC = () => {
    // 입력값만 상태로 유지
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ❗ 백엔드 호출 없이 바로 홈으로
        navigate(ClientUrl.HOME); // "/home"
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* 왼쪽 소개 영역 — 회원가입 버튼 제거 */}
            <motion.div
                className="hidden md:flex lg:hidden md:flex-1 md:items-center md:justify-center p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        연결의 미학, 노드
                    </h1>
                    <p className="text-xl text-gray-600">
                        노드에서 새로운 감각의 소통과 예술적 연결을 경험해보세요.
                    </p>
                </div>
            </motion.div>

            {/* 로그인 폼 */}
            <motion.div
                className="flex-1 flex items-center justify-center p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                        로그인
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FloatingInput
                            label="UserID"
                            name="id"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <FloatingInput
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* 비밀번호 찾기만 남겨둠 */}
                        <div className="flex justify-end">
                            <Link
                                to={ClientUrl.FORGOT}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                비밀번호를 잊으셨나요?
                            </Link>
                        </div>

                        {/* 👉 단순 네비게이션 버튼 */}
                        <motion.button
                            type="submit"
                            className="w-full py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            로그인(사실상 바로 홈으로 가기)
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
