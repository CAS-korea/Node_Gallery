import axios, { AxiosError } from "axios";
import { ErrorMessages } from "../constants/ErrorMessages";
import {ServerUrl} from "../constants/ServerUrl.tsx";

const apiHandler = axios.create({
    baseURL: ServerUrl.Local, // 백엔드 URL로 수정
    timeout: 5000,
});


// 에러 핸들러 함수
const handleApiError = (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
        case 400:
            return ErrorMessages.BAD_REQUEST;
        case 401:
            return ErrorMessages.UNAUTHORIZED;
        case 403:
            return ErrorMessages.FORBIDDEN;
        case 404:
            return ErrorMessages.NOT_FOUND;
        case 409:
            return ErrorMessages.CONFLICT;
        case 500:
            return ErrorMessages.SERVER_ERROR;
        default:
            return ErrorMessages.UNKNOWN_ERROR;
    }
};

apiHandler.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.log("에러 분류 시작");
        const errorMessage = handleApiError(error); // 프론트에서 커스터마이즈된 메시지 반환
        console.log("커스터마이즈 에러 반환 완료");
        return Promise.reject(new Error(errorMessage)); // 커스터마이즈된 메시지를 반환
    }
);

export default apiHandler;
