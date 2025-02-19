import apiHandler from "../utils/ApiHandler.ts";

export const FileService = {
    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("image", file);

        const response = await apiHandler.post("/gcs/image", formData);

        return response.data.imageUrl;
    }
}