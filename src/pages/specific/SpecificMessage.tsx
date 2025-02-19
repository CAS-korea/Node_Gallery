"use client"

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostContainer from "../../components/Container.tsx";
import { Send, Paperclip, Smile, MoreVertical, ArrowLeft } from "lucide-react";
import { ClientUrl } from "../../constants/ClientUrl.ts";
import ChatReportModal from "../../components/ChatReportModal.tsx"; // 신고 모달

interface ChatMessage {
    id: number;
    sender: string;
    content: string;
    isMine: boolean;
    timestamp: string;
    isRead: boolean;
}

const dummyMessages: ChatMessage[] = [
    { id: 1, sender: "홍길동", content: "자니?", isMine: false, timestamp: "01:32", isRead: true },
    { id: 2, sender: "홍길동", content: "아 실수로 보냄", isMine: false, timestamp: "01:40", isRead: true },
    { id: 3, sender: "나", content: "?", isMine: true, timestamp: "12:03", isRead: true },
    { id: 4, sender: "홍길동", content: "아 실수라고", isMine: false, timestamp: "12:04", isRead: false },
];

const SpecificMessage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);
    const [messageInput, setMessageInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: ChatMessage = {
                id: messages.length + 1,
                sender: "나",
                content: messageInput,
                isMine: true,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isRead: false,
            };
            setMessages([...messages, newMessage]);
            setMessageInput("");
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <PostContainer>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[90vh] flex flex-col">
                {/* Chat Header */}
                <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 relative">
                    <div className="flex items-center">
                        <ArrowLeft
                            onClick={() => navigate(ClientUrl.MESSAGE)}
                            className="w-6 h-6 mr-4 text-gray-600 dark:text-gray-300 cursor-pointer"
                        />
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="홍길동"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">홍길동</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">온라인</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="cursor-pointer"
                        >
                            <MoreVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        setIsReportModalOpen(true);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    신고하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.isMine ? "items-end" : "items-start"}`}
                        >
                            <div
                                className={`max-w-[70%] p-3 ${
                                    msg.isMine
                                        ? "bg-blue-500 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                        : "bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-100 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                                } ${msg.isMine ? "mr-2" : "ml-2"}`}
                            >
                                {!msg.isMine && (
                                    <p className="font-semibold mb-1 text-gray-800 dark:text-gray-100">
                                        {msg.sender}
                                    </p>
                                )}
                                <p>{msg.content}</p>
                            </div>
                            <div className="mt-1 flex items-center space-x-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {msg.timestamp}
                                </span>
                                {msg.isMine && (
                                    <span className="text-xs text-blue-300">
                                        {msg.isRead ? "읽음" : "전송됨"}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-100 rounded-full px-4 py-2">
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-600 rounded-full">
                        <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <textarea
                            placeholder="메시지를 입력하세요..."
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none resize-none text-gray-800 dark:text-gray-100"
                            rows={1}
                            value={messageInput}
                            onChange={(e) => {
                                setMessageInput(e.target.value);
                                setIsTyping(e.target.value.length > 0);
                            }}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 신고 모달 */}
            {isReportModalOpen && (
                <ChatReportModal
                    onClose={() => setIsReportModalOpen(false)}
                    onConfirm={(reason: string) => {
                        console.log("Report confirmed:", reason);
                        setIsReportModalOpen(false);
                    }}
                />
            )}
        </PostContainer>
    );
};

export default SpecificMessage;
