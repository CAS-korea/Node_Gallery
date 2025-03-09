"use client"

import type React from "react"
import { useState } from "react"
import { Bold, Italic, List, Code, Table, Heading1, Heading2, Palette, Image, Smile } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { Separator } from "../../components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { HexColorPicker } from "react-colorful"

interface MarkdownToolbarProps {
    onAction: (action: string, selectedText: string, color?: string) => void
    onEmojiPickerToggle: () => void
    onImageInsert: () => void
    emojiButtonRef: React.RefObject<HTMLButtonElement>
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
                                                             onAction,
                                                             onEmojiPickerToggle,
                                                             onImageInsert,
                                                             emojiButtonRef,
                                                         }) => {
    const [color, setColor] = useState("#ff0000")

    const handleColorChange = (newColor: string) => {
        setColor(newColor)
    }

    const handleColorApply = () => {
        onAction("color", "", color)
    }

    return (
        <div className="flex flex-wrap gap-1 mb-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("h1", "")} className="h-8 w-8">
                            <Heading1 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>제목 1 (큰 제목)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("h2", "")} className="h-8 w-8">
                            <Heading2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>제목 2 (중간 제목)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("bold", "")} className="h-8 w-8">
                            <Bold className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>굵게 (텍스트 강조)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("italic", "")} className="h-8 w-8">
                            <Italic className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>기울임 (텍스트 강조)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("ul", "")} className="h-8 w-8">
                            <List className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>목록 (순서 없는 목록)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("code", "")} className="h-8 w-8">
                            <Code className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>코드 (코드 블록)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Popover>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Palette className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>색상 (텍스트 색상 변경)</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <PopoverContent className="w-auto p-3 ">
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">텍스트 색상 선택</h4>
                        <HexColorPicker color={color} onChange={handleColorChange} />
                        <div className="flex items-center justify-between mt-2">
                            <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: color }} />
                            <Button size="sm" onClick={handleColorApply}>
                                적용하기
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onAction("table", "")} className="h-8 w-8">
                            <Table className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>표 (데이터 표 삽입)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="mx-1 h-8" />

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={onImageInsert} className="h-8 w-8">
                            <Image className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>이미지 (사진 삽입)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={onEmojiPickerToggle} className="h-8 w-8" ref={emojiButtonRef}>
                            <Smile className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>이모지 (이모티콘 삽입)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default MarkdownToolbar

