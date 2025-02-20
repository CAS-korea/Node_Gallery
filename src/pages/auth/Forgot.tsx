"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AuthService } from "../../services/AuthService.ts"
import { Link } from "react-router-dom"
import { ClientUrl } from "../../constants/ClientUrl.ts"
import FloatingInput from "../../components/FloatingInput"

const Forgot: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"findId" | "resetPassword">("findId")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        setMessage("")

        try {
            if (activeTab === "findId") {
                await AuthService.findUserId(email)
                setMessage("아이디 찾기 이메일이 발송되었습니다.")
            } else {
                await AuthService.findPassword(email)
                setMessage("비밀번호 재설정 이메일이 발송되었습니다.")
            }
        } catch (error) {
            console.error(error)
            setMessage("이메일을 사용하는 계정을 찾을 수 없습니다.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">내 계정 찾기</h2>

                <div className="flex justify-center mb-8">
                    {["findId", "resetPassword"].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab as "findId" | "resetPassword")}
                            className={`px-6 py-3 mx-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === tab
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab === "findId" ? "아이디 찾기" : "비밀번호 찾기"}
                        </motion.button>
                    ))}
                </div>

                <div className="space-y-6">
                    <FloatingInput type="email" label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <motion.button
                        onClick={handleSubmit}
                        disabled={loading || !email}
                        className={`w-full py-4 rounded-lg text-white font-medium transition-all duration-300 ${
                            loading || !email ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center"
                                >
                                    <motion.div
                                        className="w-5 h-5 border-t-2 border-white rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {activeTab === "findId" ? "아이디 찾기" : "비밀번호 재설정"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <AnimatePresence>
                        {message && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center text-gray-600"
                            >
                                {message}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                        <Link to={ClientUrl.LOGIN} className="text-black hover:text-gray-700 transition-colors duration-300">
                            로그인으로 돌아가기
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default Forgot

