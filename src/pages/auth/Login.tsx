import {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion"; // ✅ motion 추가
import {useServices} from "../../contextAPI/ServicesProvider"; // 서비스 훅 불러오기


const Login: React.FC = () => {
    // ✅ 로컬 상태
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ 전역 상태 (로그인 함수만 사용)
    const {login} = useServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // 기존 에러
        // 초기화

        const loginDTO = {
            username: userName,
            password: password
        };

        try {
            // 로그인 처리
            await login(loginDTO);
        } catch (error: unknown) {
            // 에러 메시지 설정
            if (error instanceof Error) {
                setError(error.message); // 에러 메시지를 로컬 상태에 설정
                console.log("로컬 상태로 설정 완료");
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            // 로딩 상태 해제
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
                    to="/register"
                    className="border-2 border-white px-12 py-3 rounded-full hover:bg-white hover:text-[#4AA8FF] transition-colors"
                >
                    회원가입하기
                </Link>
            </div>

            {/* ✅ motion 적용 */}
            <motion.div
                initial={{opacity: 0.7, scale: 0.98}} // 처음에 작게 시작
                animate={{opacity: 1, scale: 1}}    // 나타날 때 커짐
                exit={{opacity: 0.7, scale: 0.98}}    // 사라질 때 다시 작아짐
                transition={{duration: 0.1}}
                className="w-1/2 bg-white rounded-[40px] flex flex-col justify-center items-center px-20"
            >
                <h2 className="text-3xl font-bold mb-12">로그인하기</h2>
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />

                    {/* ✅ 로컬 상태 기반 에러 메시지 표시 */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="text-right">
                        <button type="button" className="text-gray-500 hover:text-gray-700">
                            비밀번호를 잊으셨나요?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#000000] text-white rounded-full hover:bg-[#440000] transition-colors"
                        disabled={loading} // ✅ 로컬 상태의 loading 사용
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>
            </motion.div>
        </>
    );
};

export default Login;