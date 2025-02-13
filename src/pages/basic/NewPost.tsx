import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { PostDTO } from '../../types/PostDTO';
import { useServices } from "../../contextAPI/ServicesProvider";
import PostContainer from "../../components/Container";

// 마크다운 옵션 설정 (GFM, 줄바꿈, 스마트 리스트 등)
marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    // 코드 하이라이팅 추가 예시 (highlight.js 설치 후 사용)
    // highlight: function(code, lang) {
    //   const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    //   return hljs.highlight(code, { language }).value;
    // }
});

const NewPost: React.FC = () => {
    const { createPost } = useServices();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [previewContent, setPreviewContent] = useState<string>('');

    // 제목과 본문이 바뀔 때마다 미리보기 업데이트
    useEffect(() => {
        const markdown = `# ${title}\n\n${content}`;
        setPreviewContent(marked.parse(markdown));
    }, [title, content]);

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
            <div className="flex flex-col md:flex-row gap-8">
                {/* 좌측 입력 영역 */}
                <div className="md:w-1/2 flex flex-col">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">새 게시물 작성</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            className="w-full px-6 py-4 bg-white/30 backdrop-blur-sm rounded-xl text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 작성하세요"
                            className="w-full px-6 py-4 bg-white/30 backdrop-blur-sm rounded-xl text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            rows={12}
                        />
                        <button
                            type="submit"
                            className="w-full py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition"
                        >
                            게시물 올리기
                        </button>
                    </form>
                </div>

                {/* 우측 미리보기 영역 */}
                <div className="md:w-1/2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">미리보기</h2>
                    <div
                        className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200 overflow-auto prose prose-stone max-h-[600px]"
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                    />
                </div>
            </div>
        </PostContainer>
    );
};

export default NewPost;
