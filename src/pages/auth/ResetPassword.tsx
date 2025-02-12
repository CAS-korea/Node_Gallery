import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useServices} from "../../context/ServicesProvider.tsx";

const ResetPassword: React.FC = () => {
    const { resetPassword } = useServices();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true);
        setMessage("");

        if (newPassword !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setMessage("비밀번호가 변경되었습니다.");
            setLoading(false);

            // 2초 후 창 닫기
            setTimeout(() => {
                window.close();
            }, 2000);
        } catch (error) {
            console.error(error);
            setMessage("오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">비밀번호 재설정</h2>
            <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 mt-4"
            />
            <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 mt-2"
            />
            <button
                onClick={handleResetPassword}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
                비밀번호 변경
            </button>

            {message && <p className="text-center text-gray-600">{message}</p>}
        </div>
    );
};

export default ResetPassword;