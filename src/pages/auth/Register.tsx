import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "../../contextAPI/ServicesProvider";
import { RegisterDTO, UserRole } from "../../types/RegisterDTO";
import { ROUTES } from "../../constants/ROUTES.tsx";
import FloatingInput from "../../components/FloatingInput"; // 경로에 맞게 수정

const Register: React.FC = () => {
    // 다단계 진행 상태 및 입력 관련 상태
    const [currentStep, setCurrentStep] = useState(1);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<UserRole>("student");
    const [verificationPhoto, setVerificationPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const { register } = useServices();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 다단계 진행 중일 경우 다음 단계로 이동
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
            return;
        }

        setLoading(true);

        // 클라이언트 측 비밀번호 재입력 확인
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            setLoading(false);
            return;
        }

        const registerDTO: RegisterDTO = {
            id,
            password,
            name,
            phoneNumber,
            studentNumber,
            email,
            role,
            isAuthorized: false,
            introduce: "",
        };

        try {
            await register(registerDTO);
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
                        <FloatingInput
                            label="ID"
                            name="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <FloatingInput
                            label="이름"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FloatingInput
                            label="전화번호"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <FloatingInput
                            label="학번"
                            name="studentNumber"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
                        />
                        <FloatingInput
                            label="이메일"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FloatingInput
                            label="비밀번호"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FloatingInput
                            label="비밀번호 재입력"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center space-y-6">
                        <p className="text-lg font-medium text-gray-700">회원 유형 선택</p>
                        <div className="flex justify-center space-x-6">
                            <motion.button
                                type="button"
                                onClick={() => setRole("student")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border transition ${
                                    role === "student"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-transparent text-gray-600 border-gray-300"
                                }`}
                            >
                                재학생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("graduate")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border transition ${
                                    role === "graduate"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-transparent text-gray-600 border-gray-300"
                                }`}
                            >
                                졸업생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("professor")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full border transition ${
                                    role === "professor"
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
                        <p className="text-lg font-medium text-gray-700">
                            학교 인증 (사진 첨부)
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setVerificationPhoto(e.target.files[0]);
                                }
                            }}
                            className="mt-2"
                        />
                        {verificationPhoto && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(verificationPhoto)}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
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
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full"
                    >
                        이전
                    </motion.button>
                )}
                <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition"
                >
                    {currentStep === 3
                        ? loading
                            ? "가입 중..."
                            : "회원가입하기"
                        : "다음"}
                </motion.button>
            </div>
        );
    };

    const steps = [
        { id: 1, label: "정보 입력" },
        { id: 2, label: "역할 선택" },
        { id: 3, label: "학교 인증" },
    ];

    const renderSidebar = () => {
        return (
            <div className="flex flex-col items-center space-y-8 bg-transparent rounded-lg p-10 pt-52">
                {steps.map((step) => (
                    <motion.div
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        whileHover={{ scale: 1.1 }}
                        className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-300 ${
                            currentStep === step.id
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-600 shadow-lg"
                        }`}
                    >
                        {step.id}
                    </motion.div>
                ))}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">현재</p>
                    <h2 className="text-lg font-bold text-gray-800">
                        {steps.find((step) => step.id === currentStep)?.label}
                    </h2>
                </div>
            </div>
        );
    };

    return (
        <motion.div className="min-h-screen flex flex-col md:flex-row bg-transparent">
            <div className="hidden md:flex">{renderSidebar()}</div>
            <div className="flex-1 flex justify-center items-center p-8">
                <motion.div
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="w-full max-w-md bg-transparent rounded-3xl p-10 shadow-[0_4px_16px_0_rgba(31,38,135,0.37)] relative backdrop-opacity-20"
                >

                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
                        회원가입
                    </h2>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {renderStepContent()}
                        {renderNavigation()}
                    </form>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 text-center"
                    >
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            이미 계정이 있으신가요? 로그인하기
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Register;
