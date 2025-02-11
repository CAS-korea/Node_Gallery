import React, { useState, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
                                                         label,
                                                         error,
                                                         type = "text",
                                                         ...rest
                                                     }) => {
    const [isFocused, setIsFocused] = useState(false);

    const labelVariants = {
        focused: {
            top: "0.7rem",
            left: "0.8rem",
            fontSize: "0.65rem",
            color: "#007AFF",
            backgroundColor: "transparent",
            padding: "0 0.25rem",
            // focused 상태에는 transform이 명시되지 않음 (기본값)
        },
        unfocused: {
            top: "50%",
            left: "1rem",
            fontSize: "1rem",
            color: "#A1A1AA",
            backgroundColor: "transparent",
            transform: "translateY(-50%)",
        },
        error: {
            // 에러 발생 시에도 label이 아래로 내려가지 않도록 transform: translateY(-50%)를 강제
            top: "0.7rem",
            left: "0.8rem",
            fontSize: "0.65rem",
            color: "#D32F2F", // 에러 색상 (예: 빨강)
            backgroundColor: "transparent",
            padding: "0 0.25rem",
            transform: "translateY(-50%)",
        },
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (rest.onFocus) {
            rest.onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (rest.onBlur) {
            rest.onBlur(e);
        }
    };

    return (
        <div className="relative">
            <motion.label
                htmlFor={rest.name}
                // 에러가 있을 경우 "error" variant를 사용, 그 외에는 기존 조건에 따라 focused 또는 unfocused 사용
                animate={error ? "error" : (isFocused || rest.value ? "focused" : "unfocused")}
                initial="unfocused"
                variants={labelVariants}
                transition={{ duration: 0.15 }}
                className="absolute pointer-events-none bg-transparent"
            >
                {label}
            </motion.label>
            <input
                {...rest}
                id={rest.name}
                type={type}
                value={rest.value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-white border rounded-xl transition focus:outline-none ${
                    error
                        ? "border-red-500 focus:ring-2 focus:ring-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-blue-400"
                } ${rest.className ? rest.className : ""}`}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default FloatingInput;
