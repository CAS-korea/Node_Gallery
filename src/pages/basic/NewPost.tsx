import React, { useState } from 'react';
import { marked } from 'marked';
import { PostDTO } from '../../types/PostDTO.tsx';
import { useServices } from "../../contextAPI/ServicesProvider.tsx";
import PostContainer from "../../components/Container";

const NewPost: React.FC = () => {
    const { createPost } = useServices();  // API 호출 함수 가져오기
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // 제목과 본문을 합쳐서 미리보기 생성
    const previewContent = marked(`# ${title}\n\n${content}`);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const postDTO: PostDTO = { title, content };
        try {
            await createPost(postDTO);
            alert('게시물이 성공적으로 작성되었습니다!');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
            alert('게시물 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <PostContainer>
            {/* 입력 창 */}
            <div className="w-1/2 pr-4">
                <h1 className="text-3xl font-semibold mb-4">새 게시물 작성</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 제목 입력 */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="w-full px-4 py-2 bg-white rounded-md text-black border border-gray-300 focus:outline-none"
                    />
                    {/* 내용 입력 */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 작성하세요"
                        className="w-full px-4 py-2 bg-white rounded-md text-black border border-gray-300 focus:outline-none"
                        rows={10}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gray-200 text-black rounded-full hover:bg-gray-100 transition-colors"
                    >
                        게시물 올리기
                    </button>
                </form>
            </div>

            {/* 미리보기 창 */}
            <div className="w-1/2 pl-1">
                <h2 className="text-xl font-semibold mb-4">미리보기</h2>
                <div
                    className="prose prose-invert bg-gray-100 text-black p-4 rounded-md"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                />
            </div>
        </PostContainer>
    );
};

export default NewPost;
