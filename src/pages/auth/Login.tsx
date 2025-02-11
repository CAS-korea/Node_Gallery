import {Link} from "react-router-dom";
import {ClientUrl} from "../../constants/ClientUrl.ts"; // 서비스 훅 불러오기
import { useState } from "react";
import { motion } from "framer-motion";
import { useServices } from "../../context/ServicesProvider";
import FloatingInput from "../../components/FloatingInput";


const Login: React.FC = () => {
    // ✅ 로컬 상태
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const loginDTO = { userId, password };

        try {
            await login(loginDTO);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* 왼쪽 영역: 게시글 컨테이너 */}
            <div className="flex-1 flex items-center justify-center ">
                <div className="w-full max-w-md p-6 border border-bac-300 rounded-2xl shadow-md bg-white">
                    {/* AnimatedCharacter: 게시글 내부에 위치 */}
                    <div className="mb-4 flex justify-start">
                    </div>

                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-2">연결의 미학, 노드</h1>
                        <p className="text-gray-600">
                            노드에서 새로운 감각의 소통과 예술적 연결을 경험해보세요. 창의적 영감이 넘치는 이야기가 기다리고 있습니다.
                        </p>
                    </div>
                    <div className="text-right">
                        <Link
                            to={ClientUrl.REGISTER}
                            className="text-blue-400 hover:underline"
                        >
                            회원가입 하기
                        </Link>
                    </div>
                </div>
            </div>

            {/* 오른쪽 영역: 로그인 폼 */}
            <div className="flex-1 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.7, scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="w-full max-w-md p-6"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">로그인</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
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

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <div className="text-right">
                            <button type="button" className="text-gray-500 hover:text-gray-700">
                                비밀번호를 잊으셨나요?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "로그인 중..." : "로그인"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
