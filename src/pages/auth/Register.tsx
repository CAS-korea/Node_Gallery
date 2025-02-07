import React, {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useServices} from "../../contextAPI/ServicesProvider";
import {RegisterDTO, UserRole} from "../../types/RegisterDTO";
import {ErrorMessages} from "../../constants/ErrorMessages";
import {ClientUrl} from "../../constants/ClientUrl.tsx";

const Register: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('STUDENT');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {register} = useServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError(ErrorMessages.PASSWORD_MISMATCH);
            setLoading(false);
            return;
        }

        const registerDTO: RegisterDTO = {
            userId,
            password,
            name,
            phoneNumber,
            studentNumber,
            email,
            role,
            isAuthorized: false,
            introduce: '',
            profileImageUrl: ''
        };

        try {
            await register(registerDTO);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full h-full flex justify-center items-center"
        >
            <motion.div
                initial={{opacity: 0.7, scale: 0.95}} // 처음에 작게 시작
                animate={{opacity: 1, scale: 1}}    // 나타날 때 커짐
                exit={{opacity: 0.7, scale: 0.95}}    // 사라질 때 다시 작아짐
                transition={{duration: 0.1}}
                className="w-[500px] bg-white rounded-[40px] p-12 flex flex-col items-center shadow-lg"
            >
                <h1 className="text-4xl font-bold mb-4">NODE</h1>
                <h2 className="text-2xl font-medium mb-8">회원가입</h2>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="text"
                        placeholder="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="text"
                        placeholder="studentNumber"
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Re-type password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />

                    {/* ✅ 버튼 애니메이션 적용 */}
                    <div className="flex justify-center space-x-4">
                        <motion.button
                            type="button"
                            onClick={() => setRole('STUDENT')}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={`px-6 py-2 rounded-full ${
                                role === 'STUDENT' ? 'bg-[#00E5FF] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            재학생
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={() => setRole('GRADUATE')}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={`px-6 py-2 rounded-full ${
                                role === 'GRADUATE' ? 'bg-[#00E5FF] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            졸업생
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={() => setRole('PROFESSOR')}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={`px-6 py-2 rounded-full ${
                                role === 'PROFESSOR' ? 'bg-[#00E5FF] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            교수
                        </motion.button>
                    </div>

                    {/* ✅ 에러 메시지 애니메이션 추가 */}
                    {error && (
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.1}}
                            className="text-red-500 text-sm text-center"
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* ✅ 버튼 애니메이션 (클릭 시 반응) */}
                    <motion.button
                        type="submit"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="w-full py-3 bg-[#00E5FF] text-white rounded-full hover:bg-[#00D4FF] transition-colors"
                        disabled={loading}
                    >
                        {loading ? '가입 중...' : '회원가입하기'}
                    </motion.button>
                </form>

                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className="mt-6">
                    <Link to={ClientUrl.LOGIN} className="text-gray-600 hover:text-black transition-colors">
                        이미 계정이 있으신가요? 로그인하기
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Register;