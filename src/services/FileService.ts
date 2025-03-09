import apiHandler from "../utils/ApiHandler.ts"

export const FileService = {
    async uploadImage(file: File): Promise<string> {
        try {
            const formData = new FormData()
            formData.append("image", file)

            // multipart/form-data 헤더는 브라우저가 자동 설정하지만, 명시적으로 설정해볼 수 있습니다.
            const response = await apiHandler.post("/gcs/image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            if (response.data && response.data.imageUrl) {
                return response.data.imageUrl
            } else {
                throw new Error("Invalid response structure: imageUrl not found")
            }
        } catch (error) {
            console.error("Error uploading image:", error)
            throw error
        }
    },
}

