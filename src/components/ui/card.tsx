import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            // 밝은 모드: 흰색 배경, 연한 회색 경계, 진한 텍스트 / 다크 모드: 짙은 회색 배경, 어두운 경계, 밝은 텍스트
            "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        // 헤더 부분에 패딩과 하단 경계를 추가하여 구분.
        className={cn("flex flex-col space-y-2 p-6 border-b border-gray-200 dark:border-gray-700", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        // 제목은 크고 굵게, tracking-tight를 적용해 깔끔하게 표현합니다.
        className={cn("text-2xl font-bold tracking-tight", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        // 설명 텍스트는 조금 작은 폰트와 muted 색상을 사용
        className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        // 내용 부분은 여백(p-6)으로 구성
        className={cn("p-6", className)}
        {...props}
    />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        // 하단에 경계와 패딩을 추가하여 액션 버튼 등을 구분.
        className={cn("flex items-center p-6 border-t border-gray-200 dark:border-gray-700", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
