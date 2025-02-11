import {Link} from "react-router-dom";
import {ClientUrl} from "../../constants/ClientUrl.ts"; // 서비스 훅 불러오기
import { useState } from "react";
import { motion } from "framer-motion";
import { useServices } from "../../context/ServicesProvider";
import AnimatedCharacter from "../../components/AnimatedCharacter";
import { getCaretCoordinates } from "../../utils/getCaretCoordinates";

const Login: React.FC = () => {
    // ✅ 로컬 상태
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // AnimatedCharacter 관련 상태
    const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const { login } = useServices();

    // helper: 커서 위치 업데이트
    const updateCaretPosition = (input: HTMLInputElement) => {
        const caretIndex = input.selectionStart ?? 0;
        const coords = getCaretCoordinates(input, caretIndex);
        setTargetPos(coords);
    };

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
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-1/2 flex flex-col justify-center items-center text-white px-12">
                <h1 className="text-6xl font-bold mb-8">NODE</h1>
                <h2 className="text-3xl mb-2">계정이 없으신가요?</h2>
                <p className="text-center mb-8">가입하고 다른 노더와 소통의 기회를 가져보세요!</p>
                <Link
                    to={ClientUrl.REGISTER}
                    className="border-2 border-white px-12 py-3 rounded-full hover:bg-white hover:text-[#4AA8FF] transition-colors"
                >
                    회원가입하기
                </Link>
            </div>

            <div className="w-1/2 bg-white rounded-[40px] flex flex-col justify-center items-center px-20">
                <motion.div
                    initial={{ opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.7, scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="w-full"
                >
                    <h2 className="text-3xl font-bold mb-12">로그인하기</h2>
                    {/* AnimatedCharacter를 로그인 폼 상단에 배치 */}
                    <div className="mb-8">
                        <AnimatedCharacter targetPos={targetPos} isPasswordFocused={isPasswordFocused} />
                    </div>
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="ID"
                            value={userId}
                            onChange={(e) => {
                                setUserId(e.target.value);
                                updateCaretPosition(e.target);
                            }}
                            onFocus={(e) => {
                                updateCaretPosition(e.target);
                                setIsPasswordFocused(false);
                            }}
                            onKeyUp={(e) => {
                                updateCaretPosition(e.target);
                            }}
                            onBlur={() => setTargetPos(null)}
                            className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => {
                                // 비밀번호 입력 시에는 눈은 감은 상태로 → targetPos은 중앙으로 설정(또는 null)
                                const rect = e.target.getBoundingClientRect();
                                setTargetPos({
                                    x: rect.left + rect.width / 2,
                                    y: rect.top + rect.height / 2,
                                });
                                setIsPasswordFocused(true);
                            }}
                            onBlur={() => {
                                setTargetPos(null);
                                setIsPasswordFocused(false);
                            }}
                            className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
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
                            className="w-full py-3 bg-[#000000] text-white rounded-full hover:bg-[#440000] transition-colors"
                            disabled={loading}
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default Login;
