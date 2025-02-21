import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { PostDto, postVisibility } from '../../types/PostDto.ts';
import { useServices } from '../../context/ServicesProvider';
import PostContainer from '../../components/Container';
import { X, Tag } from 'lucide-react';
import { FileService } from '../../services/FileService';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClientUrl } from '../../constants/ClientUrl';
import VisibilitySelector from '../../components/addpost/VisibilitySelector';
import DraftModal, { Draft } from '../../components/addpost/DraftModal';
import ImageModal from '../../components/addpost/ImageModal';

// 마크다운 옵션 설정
marked.setOptions({
    gfm: true,
    breaks: true,
});

// 마크다운에서 첫 이미지 URL 추출 함수
const extractFirstImageUrl = (content: string): string => {
    const regex = /!\[\]\((https?:\/\/[^\s)]+)\)/;
    const match = content.match(regex);
    return match ? match[1] : "";
};

const NewPost: React.FC = () => {
    const { createPost } = useServices();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [previewContent, setPreviewContent] = useState<string>('');
    const [userTag, setUserTag] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [postVis, setPostVis] = useState<postVisibility>('PUBLIC');
    const [thumbNailImage, setThumbNailImage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);

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
                setContent(prev => prev.substring(0, startPos) + `\n![](${imageUrl})\n` + prev.substring(endPos));
                if (!thumbNailImage) setThumbNailImage(imageUrl);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = startPos + `\n![](${imageUrl})\n`.length;
                }, 0);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, [thumbNailImage]);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' || tagInput.trim() === '') return;
        e.preventDefault();
        const newTag = tagInput.trim();
        setUserTag(prev => (!prev.includes(newTag) ? [...prev, newTag] : prev));
        setTimeout(() => setTagInput(''), 0);
    };

    const handleRemoveTag = (tag: string) => {
        setUserTag(userTag.filter(t => t !== tag));
    };

    // 마크다운 툴바 함수
    const insertMarkdown = (syntax: string) => {
        if (!contentRef.current) return;
        const textarea = contentRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = content.substring(0, start);
        const after = content.substring(end);
        let toInsert = "";
        switch (syntax) {
            case "h1":
                toInsert = `# Heading 1\n`;
                break;
            case "h2":
                toInsert = `## Heading 2\n`;
                break;
            case "bold":
                toInsert = `**bold text**`;
                break;
            case "italic":
                toInsert = `_italic text_`;
                break;
            case "ul":
                toInsert = `- List item\n`;
                break;
            case "code":
                toInsert = "```\ncode\n```";
                break;
            case "color":
                toInsert = `<span style="color: red;">red text</span>`;
                break;
            case "table":
                toInsert = `| Header 1 | Header 2 |\n| --- | --- |\n| Content 1 | Content 2 |\n`;
                break;
            case "image":
                setShowImageModal(true);
                return;
            default:
                toInsert = "";
        }
        setContent(before + toInsert + after);
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + toInsert.length;
            textarea.focus();
        }, 0);
    };

    const handleSaveDraft = () => {
        const newDraft: Draft = {
            id: Date.now(),
            title: title.trim() || "제목없음",
            createdAt: Date.now(),
        };
        setDrafts(prev => {
            const updated = [newDraft, ...prev];
            return updated.slice(0, 5);
        });
        alert("임시저장 되었습니다!");
    };

    const handleDeleteDraft = (id: number) => {
        setDrafts(prev => prev.filter(d => d.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const postDTO: PostDto = {
            title,
            content,
            userTag,
            postVisibility: postVis,
            thumbNailImage,
        };
        try {
            await createPost(postDTO);
            alert('게시물이 성공적으로 작성되었습니다!');
            setTitle('');
            setContent('');
            setUserTag([]);
            setTagInput('');
            setThumbNailImage('');
        } catch (error) {
            console.error(error);
            alert('게시물 작성 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PostContainer>
            {/* 헤더 영역: 공개범위 설정 및 게시물 올리기/임시저장 버튼 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <VisibilitySelector value={postVis} onChange={setPostVis} />
                    <button
                        onClick={() => setShowDraftModal(true)}
                        className="px-4 py-2 bg-yellow-300 hover:bg-gray-400 text-gray-900 rounded-md transition"
                    >
                        임시저장 목록
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded-lg transition flex items-center gap-2 ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        {isSubmitting ? (
                            <motion.div
                                className="w-6 h-6 border-t-4 border-b-2 border-gray-300 bg-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        ) : (
                            '게시물 올리기'
                        )}
                    </button>
                </div>
            </div>

            {/* 임시저장 모달 */}
            <AnimatePresence>
                {showDraftModal && (
                    <DraftModal
                        drafts={drafts}
                        onDelete={handleDeleteDraft}
                        onClose={() => setShowDraftModal(false)}
                        onSaveDraft={handleSaveDraft}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 좌측: 작성 영역 */}
                <div className="md:w-1/2 flex flex-col">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        새 게시물 작성
                    </h1>

                    {/* 마크다운 툴바 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={() => insertMarkdown("h1")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">H1</button>
                        <button onClick={() => insertMarkdown("h2")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">H2</button>
                        <button onClick={() => insertMarkdown("bold")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Bold</button>
                        <button onClick={() => insertMarkdown("italic")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Italic</button>
                        <button onClick={() => insertMarkdown("ul")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">List</button>
                        <button onClick={() => insertMarkdown("code")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Code</button>
                        <button onClick={() => insertMarkdown("color")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Color</button>
                        <button onClick={() => insertMarkdown("table")} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Table</button>
                        {/* 이미지 버튼을 다른 버튼보다 크게 */}
                        <button onClick={() => insertMarkdown("image")} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600">
                            Image
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            className="w-full px-6 py-4 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />

                        <textarea
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 작성하세요"
                            className="w-full px-6 py-4 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                            rows={12}
                        />

                        {/* 태그 입력 영역 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                태그 입력 (Enter 키로 추가)
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <AnimatePresence>
                                    {userTag.map((tag, index) => (
                                        <motion.span
                                            key={tag}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                                        >
                                            <Tag size={16} className="mr-2 text-gray-600 dark:text-white" />
                                            <span className="text-black dark:text-white">{tag || "제목없음"}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 focus:outline-none"
                                            >
                                                <X size={14} />
                                            </motion.button>
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
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

                {/* 우측: 미리보기 영역 */}
                <div className="md:w-1/2 flex flex-col dark:text-white">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">미리보기</h2>
                    <div
                        className="p-6 bg-white/30 dark:bg-gray-700 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600 overflow-auto prose prose-stone dark:prose-invert max-h-[600px]"
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                    />
                </div>
            </div>

            {/* 나가기 버튼 */}
            <div className="mt-8 text-center">
                <Link to={ClientUrl.HOME} className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                    나가기
                </Link>
            </div>

            {/* 이미지 삽입 모달 */}
            <AnimatePresence>
                {showImageModal && (
                    <ImageModal
                        onClose={() => setShowImageModal(false)}
                        onInsert={(url) => {
                            if (!contentRef.current) return;
                            const textarea = contentRef.current;
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const before = content.substring(0, start);
                            const after = content.substring(end);
                            const toInsert = `\n![](${url})\n`;
                            setContent(before + toInsert + after);
                            setTimeout(() => {
                                textarea.selectionStart = textarea.selectionEnd = start + toInsert.length;
                                textarea.focus();
                            }, 0);
                        }}
                    />
                )}
            </AnimatePresence>
        </PostContainer>
    );
};

export default NewPost;
