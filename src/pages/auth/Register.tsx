import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../../contextAPI/ServicesProvider';
import { RegisterDTO, UserRole } from '../../types/RegisterDTO';
import { ErrorMessages } from '../../constants/ErrorMessages';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('STUDENT');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register } = useServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError(ErrorMessages.PASSWORD_MISMATCH);
            setLoading(false);
            return;
        }

        const registerDTO: RegisterDTO = { username, email, password, role };

        try {
            await register(registerDTO);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message); // ✅ API에서 변환된 에러 메시지 사용
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] bg-white rounded-[40px] p-12 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4">NODES</h1>
                <h2 className="text-2xl font-medium mb-8">회원가입</h2>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-6 py-3 bg-gray-100 rounded-full outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
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

                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={() => setRole('STUDENT')}
                            className={`px-6 py-2 rounded-full ${
                                role === 'STUDENT' ? 'bg-[#00E5FF] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            재학생
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('GRADUATE')}
                            className={`px-6 py-2 rounded-full ${
                                role === 'GRADUATE' ? 'bg-[#00E5FF] text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            졸업생
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#00E5FF] text-white rounded-full hover:bg-[#00D4FF] transition-colors"
                        disabled={loading}
                    >
                        {loading ? '가입 중...' : '회원가입하기'}
                    </button>
                </form>

                <div className="mt-6">
                    <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                        이미 계정이 있으신가요? 로그인하기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
