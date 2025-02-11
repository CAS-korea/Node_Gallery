import axios, {AxiosError} from "axios";
import {ErrorMessages} from "../constants/ErrorMessages.ts";
import {ServerUrl} from "../constants/ServerUrl.ts";

const apiHandler = axios.create({
    baseURL: ServerUrl.SERVER, // 백엔드 URL로 수정
    timeout: 5000,
});


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
        const errorMessage = handleApiError(error);
        return Promise.reject(new Error(errorMessage));
    }
);

export default apiHandler;
