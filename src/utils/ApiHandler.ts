import axios, {AxiosError} from "axios";
import {ServerUrl} from "../constants/ServerUrl.ts";

const apiHandler = axios.create({
    baseURL: ServerUrl.SERVER,
    withCredentials: true
});

apiHandler.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error.response?.data));

export default apiHandler;