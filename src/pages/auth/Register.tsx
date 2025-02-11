import React, {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useServices} from "../../context/ServicesProvider";
import {UserEntity, UserRole} from "../../types/UserEntity.ts";
import {ErrorMessages} from "../../constants/ErrorMessages.ts";
import {ClientUrl} from "../../constants/ClientUrl.ts";

// 백엔드 유효성 검사와 동일한 조건을 적용하는 프론트엔드 검증 함수들
const isIdValid = (id: string) => /^[A-Za-z0-9]{5,}$/.test(id);
const isPasswordValid = (password: string) =>
    /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$*]{8,}$/.test(password);
const isNameValid = (name: string) => /^[A-Za-z가-힣]+$/.test(name);
const isPhoneNumberValid = (phoneNumber: string) => /^[0-9]{11}$/.test(phoneNumber);
const isStudentNumberValid = (studentNumber: string) => /^[0-9]{8}$/.test(studentNumber);
const isEmailValid = (email: string) => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);
import FloatingInput from "../../components/FloatingInput";

const Register: React.FC = () => {
    // 다단계 진행 상태 및 입력 관련 상태
    const [currentStep, setCurrentStep] = useState(1);

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('STUDENT');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useServices();
    const stepLabels = ["정보 입력", "역할 선택", "학교 인증"];

    // 각 필드별 에러 상태
    const [errors, setErrors] = useState({
        userId: "",
        name: "",
        phoneNumber: "",
        studentNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === 1) {
            let newErrors = {
                userId: "",
                name: "",
                phoneNumber: "",
                studentNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
            };
            let hasError = false;

            // ID 검증
            if (!userId.trim()) {
                newErrors.userId = "ID가 채워지지 않았습니다.";
                hasError = true;
            } else if (!isIdValid(userId)) {
                newErrors.userId = "영어와 숫자로만 이루어진 5자 이상의 ID를 입력해주세요.";
                hasError = true;
            }
            // 이름 검증
            if (!name.trim()) {
                newErrors.name = "이름이 채워지지 않았습니다.";
                hasError = true;
            } else if (!isNameValid(name)) {
                newErrors.name = "이름은 한글 혹은 영어로만 구성되어야 합니다.";
                hasError = true;
            }
            // 전화번호 검증
            if (!phoneNumber.trim()) {
                newErrors.phoneNumber = "전화번호가 채워지지 않았습니다.";
                hasError = true;
            } else if (!isPhoneNumberValid(phoneNumber)) {
                newErrors.phoneNumber = "전화번호는 숫자 11자리여야 합니다.";
                hasError = true;
            }
            // 학번 검증
            if (!studentNumber.trim()) {
                newErrors.studentNumber = "학번이 채워지지 않았습니다.";
                hasError = true;
            } else if (!isStudentNumberValid(studentNumber)) {
                newErrors.studentNumber = "학번은 숫자 8자리여야 합니다.";
                hasError = true;
            }
            // 이메일 검증
            if (!email.trim()) {
                newErrors.email = "이메일이 채워지지 않았습니다.";
                hasError = true;
            } else if (!isEmailValid(email)) {
                newErrors.email = "유효한 이메일 형식을 입력해주세요.";
                hasError = true;
            }
            // 비밀번호 검증
            if (!password.trim()) {
                newErrors.password = "비밀번호가 채워지지 않았습니다.";
                hasError = true;
            } else if (!isPasswordValid(password)) {
                newErrors.password = "비밀번호는 8자 이상이며, 소문자와 숫자를 포함해야 합니다.";
                hasError = true;
            }
            // 비밀번호 재입력 검증
            if (!confirmPassword.trim()) {
                newErrors.confirmPassword = "비밀번호가 채워지지 않았습니다.";
                hasError = true;
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
                hasError = true;
            }

            if (hasError) {
                setErrors(newErrors);
                return;
            }
            // 에러 없으면 에러 상태 초기화 후 다음 스텝으로
            setErrors(newErrors);
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
            // 스텝2는 role이 기본값("student")으로 선택되어 있으므로 바로 진행
            setCurrentStep(currentStep + 1);
        }
    };

    // 스텝3에서 최종 제출 시 검증 및 제출 처리
    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors = { ...errors};
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
            setErrors(newErrors);
            return;
        }
        setErrors(newErrors);
        setLoading(true);

        const userEntity: UserEntity = {
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
            await register(userEntity);
            // 회원가입 성공 후 추가 작업 (예: 페이지 이동, 알림 등)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <FloatingInput
                                label="ID"
                                name="id"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                error={errors.userId}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="이름"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="전화번호"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={errors.phoneNumber}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="학번"
                                name="studentNumber"
                                value={studentNumber}
                                onChange={(e) => setStudentNumber(e.target.value)}
                                error={errors.studentNumber}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="이메일"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="비밀번호"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />
                        </div>
                        <div>
                            <FloatingInput
                                label="비밀번호 재입력"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={errors.confirmPassword}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center space-y-6">
                        <p className="text-lg font-medium text-gray-700">회원 유형 선택</p>
                        <div className="flex justify-center space-x-6">
                            <motion.button
                                type="button"
                                onClick={() => setRole("STUDENT")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border ${
                                    role === "STUDENT"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-transparent text-gray-600 border-gray-300"
                                }`}
                            >
                                재학생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("GRADUATE")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border ${
                                    role === "GRADUATE"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-transparent text-gray-600 border-gray-300"
                                }`}
                            >
                                졸업생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("PROFESSOR")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border ${
                                    role === "PROFESSOR"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-transparent text-gray-600 border-gray-300"
                                }`}
                            >
                                교수
                            </motion.button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center space-y-6">
                        <p className="text-lg font-medium text-gray-700">학교 인증 (사진 첨부)</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderNavigation = () => {
        return (
            <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                    <motion.button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full"
                    >
                        이전
                    </motion.button>
                )}
                <motion.button
                    type="button"
                    onClick={currentStep < 3 ? handleNext : handleFinalSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full shadow-md hover:bg-blue-600"
                >
                    {currentStep === 3 ? (loading ? "가입 중..." : "회원가입하기") : "다음"}
                </motion.button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br rounded-2xl from-blue-100 to-purple-100 flex items-center justify-center p-4">
            {/* 외부 컨테이너에 motion.div를 적용하여 레이아웃 변화 시 부드러운 transition을 구현 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
                className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl"
            >
                {/* 프로그레스바 영역 - 중앙 정렬 및 업그레이드 */}
                <div className="mb-6 w-full max-w-md">
                    {/* 로딩바 컨테이너 */}
                    <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
                        {/* 애니메이션 진행률 표시 - currentStep: 1 ~ 3 */}
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #3b82f6, #9333ea)" }}
                            initial={{ width: "0%" }}
                            animate={{
                                // 스텝 1: 0%, 스텝 2: 50%, 스텝 3: 100%
                                width: `${((currentStep - 1) / (3 - 1)) * 100}%`,
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* 스텝 인디케이터 원 (로딩바 위에 겹치게 배치) */}
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                                        currentStep >= step
                                            ? " text-white"
                                            : " text-gray-600"
                                    }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-2 text-gray-700 font-semibold">
                        Step {currentStep}: {stepLabels[currentStep - 1]}
                    </div>
                </div>


                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">회원가입</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {renderStepContent()}
                    </motion.div>
                    {renderNavigation()}
                </form>
                <motion.div whileTap={{ scale: 0.95 }} className="mt-6 text-center">
                    <Link to={ClientUrl.LOGIN} className="text-gray-600 hover:text-gray-800">
                        이미 계정이 있으신가요? 로그인하기
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;
