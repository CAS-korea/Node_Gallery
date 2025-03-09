"use client"

// 이모지 라이브러리 컴포넌트 - 다양한 이모지를 카테고리별로 제공합니다
import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ScrollArea } from "../../components/ui/scroll-area"

interface EmojiLibraryProps {
    onSelectEmoji: (emoji: string) => void
    onClose: () => void
}

const EmojiLibrary: React.FC<EmojiLibraryProps> = ({ onSelectEmoji, onClose }) => {
    // 이모지 카테고리별 정의
    const emojiCategories = {
        smileys: [
            "😀",
            "😃",
            "😄",
            "😁",
            "😆",
            "😅",
            "😂",
            "🤣",
            "😊",
            "😇",
            "🙂",
            "🙃",
            "😉",
            "😌",
            "😍",
            "🥰",
            "😘",
            "😗",
            "😙",
            "😚",
        ],
        gestures: [
            "👍",
            "👎",
            "👌",
            "✌️",
            "🤞",
            "🤟",
            "🤘",
            "🤙",
            "👈",
            "👉",
            "👆",
            "👇",
            "☝️",
            "👋",
            "🤚",
            "🖐️",
            "✋",
            "🖖",
            "👏",
            "🙌",
        ],
        animals: [
            "🐶",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🦊",
            "🐻",
            "🐼",
            "🐨",
            "🐯",
            "🦁",
            "🐮",
            "🐷",
            "🐸",
            "🐵",
            "🐔",
            "🐧",
            "🐦",
            "🐤",
            "🦄",
        ],
        food: [
            "🍎",
            "🍐",
            "🍊",
            "🍋",
            "🍌",
            "🍉",
            "🍇",
            "🍓",
            "🍈",
            "🍒",
            "🍑",
            "🥭",
            "🍍",
            "🥥",
            "🥝",
            "🍅",
            "🍆",
            "🥑",
            "🥦",
            "🥬",
        ],
        travel: [
            "✈️",
            "🚗",
            "🚕",
            "🚙",
            "🚌",
            "🚎",
            "🏎️",
            "🚓",
            "🚑",
            "🚒",
            "🚐",
            "🛻",
            "🚚",
            "🚛",
            "🚜",
            "🛵",
            "🏍️",
            "🛺",
            "🚲",
            "🛴",
        ],
        symbols: [
            "❤️",
            "🧡",
            "💛",
            "💚",
            "💙",
            "💜",
            "🖤",
            "🤍",
            "🤎",
            "💔",
            "❣️",
            "💕",
            "💞",
            "💓",
            "💗",
            "💖",
            "💘",
            "💝",
            "💟",
            "☮️",
        ],
    }

    return (
        <div
            className="absolute top-1/2 left-1/4 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-72">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-sm font-medium">이모지 선택</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            </div>

            <Tabs defaultValue="smileys">
                <TabsList className="grid grid-cols-6 h-9">
                    <TabsTrigger value="smileys" className="text-lg">
                        😀
                    </TabsTrigger>
                    <TabsTrigger value="gestures" className="text-lg">
                        👍
                    </TabsTrigger>
                    <TabsTrigger value="animals" className="text-lg">
                        🐱
                    </TabsTrigger>
                    <TabsTrigger value="food" className="text-lg">
                        🍎
                    </TabsTrigger>
                    <TabsTrigger value="travel" className="text-lg">
                        ✈️
                    </TabsTrigger>
                    <TabsTrigger value="symbols" className="text-lg">
                        ❤️
                    </TabsTrigger>
                </TabsList>

                {Object.entries(emojiCategories).map(([category, emojis]) => (
                    <TabsContent key={category} value={category} className="mt-0">
                        <ScrollArea className="h-48">
                            <div className="grid grid-cols-5 gap-1 p-2">
                                {emojis.map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => {
                                            onSelectEmoji(emoji)
                                            onClose()
                                        }}
                                        className="p-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default EmojiLibrary

