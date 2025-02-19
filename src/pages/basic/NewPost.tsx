import React, {useState, useEffect} from 'react';
import {marked} from 'marked';
import {PostDTO, postVisibility} from '../../types/PostDTO.ts';
import {useServices} from "../../context/ServicesProvider.tsx";
import PostContainer from "../../components/Container";
import {X} from "lucide-react";
import {FileService} from "../../services/FileService.ts";

// 마크다운 옵션 설정 (GFM, 줄바꿈, 스마트 리스트 등)
marked.setOptions({
    gfm: true,
    breaks: true,
});

const extractFirstImageUrl = (content: string): string => {
    const regex = /!\[\]\((https?:\/\/[^\s)]+)\)/; // 마크다운 이미지 URL 패턴
    const match = content.match(regex);
    return match ? match[1] : ""; // 첫 번째 매칭된 URL 반환
};

const NewPost: React.FC = () => {
    const {createPost} = useServices();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [previewContent, setPreviewContent] = useState<string>('');
    const [userTag, setUserTag] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [postVisibility, setPostVisibility] = useState<postVisibility>('PUBLIC');
    const [thumbNailImage, setThumbNailImage] = useState<string>("");

    // 미리보기 업데이트
    useEffect(() => {
        const markdown = `# ${title}\n\n${content}`;
        setPreviewContent(marked.parse(markdown));

        setThumbNailImage(extractFirstImageUrl(content));
    }, [title, content]);

    const handlePaste = async (event: ClipboardEvent) => {
        const clipboardItems = event.clipboardData?.items;
        if (!clipboardItems) return;

        const textarea = document.activeElement as HTMLTextAreaElement;
        if (!textarea) return;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        for (const item of clipboardItems) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (!file) return;

                const imageUrl = await FileService.uploadImage(file);

                setContent((prevContent) => {
                    return (
                        prevContent.substring(0, startPos) +
                        `\n![](${imageUrl})\n` +
                        prevContent.substring(endPos)
                    );
                });

                if (!thumbNailImage) {
                    setThumbNailImage(imageUrl);
                }

                // 새 커서 위치를 이미지 URL이 추가된 위치 바로 뒤로 이동
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = startPos + `\n![](${imageUrl})\n`.length;
                }, 0);
            }
        }
    };

    // 🔹 컴포넌트 마운트 시 붙여넣기 이벤트 리스너 추가
    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, []);

    const handleAddTag = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!userTag.includes(tagInput.trim())) {
                setUserTag([...userTag, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setUserTag(userTag.filter(t => t !== tag));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postDTO: PostDTO = {
            title,
            content,
            userTag,
            postVisibility,
            thumbNailImage
        };

        try {
            await createPost(postDTO);
            alert('게시물이 성공적으로 작성되었습니다!');
            setTitle('');
            setContent('');
            setUserTag([]);
            setTagInput('');
            setThumbNailImage("");
        } catch (error) {
            console.error(error);
            alert('게시물 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <PostContainer>
            {/* 🔹 상단 우측 버튼 정렬 */}
            <div className="flex justify-end items-center gap-4 mb-6">
                {/* postVisibility 드롭다운 */}
                <select
                    value={postVisibility}
                    onChange={(e) => setPostVisibility(e.target.value as postVisibility)}
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                >
                    <option value="PUBLIC">공개</option>
                    <option value="PRIVATE">비공개</option>
                    <option value="FOLLOWERS_ONLY">팔로워만</option>
                </select>

                {/* 게시물 올리기 버튼 */}
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    게시물 올리기
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 좌측 입력 영역 */}
                <div className="md:w-1/2 flex flex-col">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        새 게시물 작성
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            className="w-full px-6 py-4 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 작성하세요"
                            className="w-full px-6 py-4 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            rows={12}
                        />

                        {/* 태그 입력 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                태그 입력 (Enter 키로 추가)
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {userTag.map((tag, index) => (
                                    <span key={index}
                                          className="bg-blue-200 dark:bg-blue-500 text-blue-800 dark:text-white px-3 py-1 rounded-full flex items-center">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-red-500">
                                            <X size={16}/>
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="태그 입력 후 Enter"
                                className="w-full mt-2 px-6 py-2 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                        </div>
                    </form>
                </div>

                {/* 우측 미리보기 영역 */}
                <div className="md:w-1/2 flex flex-col dark:text-white">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">미리보기</h2>
                    <div
                        className="p-6 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600 overflow-auto prose prose-stone dark:prose-invert max-h-[600px]"
                        dangerouslySetInnerHTML={{__html: previewContent}}
                    />
                </div>
            </div>
        </PostContainer>
    );
};

export default NewPost;
