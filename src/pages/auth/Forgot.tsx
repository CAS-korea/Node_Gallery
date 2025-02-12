import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthService } from "../../services/AuthService.ts";
import {Link} from "react-router-dom";
import {ClientUrl} from "../../constants/ClientUrl.ts";

const Forgot: React.FC = () => {
    // "아이디 찾기" or "비밀번호 찾기" 선택
    const [activeTab, setActiveTab] = useState<"findId" | "resetPassword">("findId");

    // 입력 상태
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFindId = async () => {
        setLoading(true);
        setMessage("");

        try {
            await AuthService.findUserId(email);
            setMessage("아이디 찾기 이메일이 발송되었습니다.");
        } catch (error) {
            console.error(error);
            setMessage("이메일을 사용하는 계정을 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleFindPassword = async () => {
        setLoading(true);
        setMessage("");

        try {
            await AuthService.findPassword(email);
            setMessage("비밀번호 재설정 이메일이 발송되었습니다.");
        } catch (error) {
            console.error(error);
            setMessage("이메일을 사용하는 계정을 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">내 계정 찾기</h2>

                {/* 탭 버튼 */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActiveTab("findId")}
                        className={`px-4 py-2 mx-2 rounded-lg ${
                            activeTab === "findId"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        아이디 찾기
                    </button>
                    <button
                        onClick={() => setActiveTab("resetPassword")}
                        className={`px-4 py-2 mx-2 rounded-lg ${
                            activeTab === "resetPassword"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        비밀번호 찾기
                    </button>
                </div>

                {/* 입력 필드 */}
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="text-right">
                        <Link
                            to={ClientUrl.LOGIN}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            로그인으로 돌아가기
                        </Link>
                    </div>

                    <button
                        onClick={activeTab === "findId" ? handleFindId : handleFindPassword}
                        disabled={loading}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        {loading ? "처리 중..." : activeTab === "findId" ? "아이디 찾기" : "비밀번호 재설정"}
                    </button>

                    {message && <p className="text-center text-gray-600">{message}</p>}
                </div>
            </motion.div>
        </div>
    );
};

export default Forgot;