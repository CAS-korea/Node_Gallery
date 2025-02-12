import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useServices} from "../../context/ServicesProvider.tsx";

const ResetPassword: React.FC = () => {
    const { resetPassword } = useServices();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setLoading(true);
        setMessage("");

        if (!token) {
            setMessage("잘못된 접근입니다. 유효한 링크를 확인하세요.");
            setLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            setLoading(false);
            return;
        }
        try {
            await resetPassword(token, newPassword);
            setMessage("비밀번호가 변경되었습니다.");

        } catch (error) {
            console.error(error);
            setMessage("오류가 발생했습니다.");
        } finally {
            setLoading(false);

            // 2초 후 창 닫기
            setTimeout(() => {
                window.close();
            }, 2000);
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
                className={`px-4 py-2 mt-2 text-white rounded-lg ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
            >
                {loading ? "처리 중..." : "비밀번호 변경"}
            </button>

            {message && <p className="text-center text-gray-600">{message}</p>}
        </div>
    );
};

export default ResetPassword;