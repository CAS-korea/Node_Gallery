// src/App.tsx
import "./pages/index.css";
import { HashRouter } from "react-router-dom";   // ⬅ main 에서 뺄 수도 있음
import { ServicesProvider } from "./context/ServicesProvider.tsx";
import Router from "./router/Router";            // 경로 tidy
import CustomCursor from "./components/CustomCursor";
import { useEffect } from "react";
import { ThemeProvider } from "./layouts/ThemeContext";

function App() {
    useEffect(() => {
        document.title = "NODE";
    }, []);

    return (
    <HashRouter>
        <ThemeProvider>
            {/* Router는 단 한 번! */}
                <ServicesProvider>
                    <CustomCursor />
                    <Router />
                </ServicesProvider>
        </ThemeProvider>
    </HashRouter>
    );
}

export default App;
