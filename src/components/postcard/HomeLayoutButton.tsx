"use client";

import React from "react";
import { Grid, LayoutList } from "lucide-react";

interface LayoutToggleButtonProps {
    layoutMode: "scroll" | "grid";
    setLayoutMode: React.Dispatch<React.SetStateAction<"scroll" | "grid">>;
}

const LayoutToggleButton: React.FC<LayoutToggleButtonProps> = ({ layoutMode, setLayoutMode }) => {
    return (
        <button
            onClick={() => setLayoutMode(layoutMode === "scroll" ? "grid" : "scroll")}
            className="p-2 rounded-full  text-blue-400 hover:bg-blue-200  dark:text-blue-500 dark:hover:bg-white transition-all duration-300 transform hover:scale-105 focus:outline-none"
            aria-label={layoutMode === "scroll" ? "그리드 레이아웃으로 전환" : "스크롤 레이아웃으로 전환"}
        >
            {layoutMode === "scroll" ? (
                <LayoutList className="w-5 h-5 transition-transform duration-300 ease-in-out" />
            ) : (
                <Grid className="w-5 h-5 transition-transform duration-300 ease-in-out" />
            )}
        </button>
    );
};

export default LayoutToggleButton;
