import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ClientUrl } from "../constants/ClientUrl.tsx"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 backdrop-blur-md text-gray-800 flex items-center justify-between px-6 py-3 z-50  ${
                isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <Link
                to={ClientUrl.HOME}
                className="text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-105"
            >
                NODE
            </Link>
        </motion.header>
    )
}

export default Header

