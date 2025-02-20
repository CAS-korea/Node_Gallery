import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { FileService } from '../../services/FileService';

interface ImageModalProps {
    onClose: () => void;
    onInsert: (imageHtml: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, onInsert }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [imageSize, setImageSize] = useState<number>(300); // 기본 이미지 너비 300px

    // 파일 드래그 이벤트 핸들러
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            // 파일 미리보기 생성 (FileReader 사용)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            try {
                // 실제 업로드 진행
                const url = await FileService.uploadImage(file);
                setUploadedImageUrl(url);
            } catch (err) {
                console.error("Image upload failed", err);
            }
        }
    }, []);

    const handleInsert = () => {
        // 업로드된 이미지 URL 우선, 없으면 입력된 URL 사용
        const finalUrl = uploadedImageUrl || imageUrl;
        if (finalUrl.trim()) {
            // HTML img 태그를 생성하여, inline style로 이미지 너비를 설정
            onInsert(`${finalUrl}`);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                    {/* 드래그 앤 드롭 영역 */}
                    <div
                        className={`border-2 ${dragActive ? 'border-blue-500' : 'border-dashed border-gray-400'} rounded-lg p-8 flex flex-col items-center justify-center mb-4 cursor-pointer`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" style={{ width: `${imageSize}px` }} className="object-contain" />
                        ) : (
                            <>
                                <UploadCloud className="w-12 h-12 text-gray-500 mb-2" />
                                <p className="text-lg text-gray-600">사진 드래그하기</p>
                            </>
                        )}
                    </div>

                    {/* 이미지 크기 조절 슬라이더 */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            이미지 크기: {imageSize}px
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            value={imageSize}
                            onChange={(e) => setImageSize(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">이미지 삽입</h2>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="또는 이미지 URL 입력"
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <div className="text-right">
                        <button
                            onClick={handleInsert}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-2"
                        >
                            삽입
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageModal;
