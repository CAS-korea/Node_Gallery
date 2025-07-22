import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "../../context/ServicesProvider";
import { UserEntity, UserRole } from "../../types/UserEntity.ts";
import { ClientUrl } from "../../constants/ClientUrl.ts";
import FloatingInput from "../../components/FloatingInput";

// 백엔드 유효성 검사와 동일한 조건을 적용하는 프론트엔드 검증 함수들
const isIdValid = (id: string) => /^[A-Za-z0-9]{5,}$/.test(id);
const isPasswordValid = (password: string) =>
    /^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$*]{8,}$/.test(password);
const isNameValid = (name: string) => /^[A-Za-z가-힣]+$/.test(name);
const isPhoneNumberValid = (phoneNumber: string) => /^[0-9]{11}$/.test(phoneNumber);
const isStudentNumberValid = (studentNumber: string) => /^[0-9]{8}$/.test(studentNumber);
const isEmailValid = (email: string) => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);

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
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [imageUploading, setImageUploading] = useState(false); // 이미지 업로드 중 상태 추가

    const [loading, setLoading] = useState(false);

    const { register, duplicate, uploadImage } = useServices();
    const [isIdChecked, setIsIdChecked] = useState(false);

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

    const checkUserIdDuplicate = () => {
          if (!isIdValid(userId)) {
                setErrors((prev) => ({
                      ...prev,
                      userId: "영어와 숫자로만 이루어진 5자 이상의 ID를 입력해주세요.",
                    }));
                return;
              }
          // 👉 더미 통과
              setErrors((prev) => ({ ...prev, userId: "프리패스입니다!" }));
          setIsIdChecked(true);
        };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === 1) {
            const newErrors = {
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
                newErrors.userId = "UserID가 채워지지 않았습니다.";
                hasError = true;
            } else if (!isIdChecked) {
                newErrors.userId = "ID 중복 확인을 완료해주세요.";
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
            // 스텝2는 role이 기본값("STUDENT")으로 선택되어 있으므로 바로 진행
            setCurrentStep(currentStep + 1);
        }
    };

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            setImageUploading(true); // 이미지 업로드 시작 시 로딩 상태를 true로 설정
            try {
                const url = await uploadImage(file);
                setProfileImageUrl(url);
            } catch (error) {
                console.error("이미지 업로드 실패: ", error);
            } finally {
                setImageUploading(false); // 이미지 업로드 완료 후 로딩 상태를 false로 설정
            }
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setProfileImageUrl("");
    }

    // 스텝3에서 최종 제출 시 검증 및 제출 처리
    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { ...errors };
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
            profileImageUrl,
            bannedUntil: ''
        };

        try {
            await register(userEntity);
            // 회원가입 성공 후 추가 작업 (예: 페이지 이동, 알림 등)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }; // 각 단계별 화면 요소 렌더링 (case 1, 2, 3 유지)
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        {/* UserID 입력칸과 버튼을 flex 컨테이너로 감싸서 입력칸 밖 오른쪽에 버튼을 위치 */}
                        <div className="flex items-center">
                            <div className="flex-grow">
                                <FloatingInput
                                    label="UserID"
                                    name="Userid"
                                    value={userId}
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                        setIsIdChecked(false);
                                    }}
                                    error={errors.userId}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={checkUserIdDuplicate}
                                className={`ml-2 px-4 py-2 rounded-lg text-white text-sm ${
                                    isIdChecked ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                                disabled={loading} // 로딩 중에는 버튼 비활성화
                            >
                                {isIdChecked ? "사용 가능" : "중복 확인"}
                            </button>
                        </div>
                        <FloatingInput
                            label="이름"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                        />
                        <FloatingInput
                            label="전화번호"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            error={errors.phoneNumber}
                        />
                        <FloatingInput
                            label="학번"
                            name="studentNumber"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
                            error={errors.studentNumber}
                        />
                        <FloatingInput
                            label="이메일"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <FloatingInput
                            label="비밀번호"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                        <FloatingInput
                            label="비밀번호 재입력"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
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
                                onClick={() => setRole("STUDENT")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full transition-colors ${
                                    role === "STUDENT" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                                disabled={loading} // 로딩 중에는 버튼 비활성화
                            >
                                재학생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("GRADUATE")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full transition-colors ${
                                    role === "GRADUATE" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                                disabled={loading} // 로딩 중에는 버튼 비활성화
                            >
                                졸업생
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => setRole("PROFESSOR")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2 rounded-full transition-colors ${
                                    role === "PROFESSOR" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                                disabled={loading} // 로딩 중에는 버튼 비활성화
                            >
                                교수
                            </motion.button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center space-y-6">
                        <p className="text-lg font-medium text-gray-700">프로필 사진 첨부</p>
                        <label
                            className={`cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 ${
                                imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            프로필 사진 선택
                            <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} disabled={imageUploading}/>
                        </label>
                        {imageUploading && <p>Uploading image...</p>}
                        {profileImage && (
                            <div className="relative">
                                <img src={URL.createObjectURL(profileImage)} alt="미리보기"
                                     className="w-24 h-24 object-cover rounded-full border"/>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    }; // 이전 / 다음 또는 회원가입 버튼 렌더링
    const renderNavigation = () => {
        return (
            <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                    <motion.button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="text-gray-600 hover:text-gray-900"
                        disabled={loading || imageUploading} // 로딩 또는 이미지 업로드 중에는 버튼 비활성화
                    >
                        이전
                    </motion.button>
                )}
                {currentStep < 3 ? (
                    <motion.button
                        type="button"
                        onClick={handleNext}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                        disabled={loading || imageUploading} // 로딩 또는 이미지 업로드 중에는 버튼 비활성화
                    >
                        다음
                    </motion.button>
                ) : (
                    <motion.button
                        type="button"
                        onClick={handleFinalSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading || imageUploading} // 로딩 또는 이미지 업로드 중에는 버튼 비활성화
                        className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? "가입 중..." : "회원가입하기"}
                    </motion.button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {/* 두 번째 코드 스타일과 유사한 레이아웃 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* 헤더 타이틀 디자인 */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">회원가입</h1>

                {/* 간단한 진행도 바 */}
                <div className="mb-8">
                    <div className="h-1 bg-gray-200 rounded-full">
                        <motion.div
                            className="h-full bg-gray-900 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(currentStep / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    {/* 단계별 폼 내용 */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderStepContent()}
                    </motion.div>
                    {/* 네비게이션(이전/다음/회원가입) 버튼 */}
                    {renderNavigation()}
                </form>

                {/* 로그인 페이지로 이동 링크 */}
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
