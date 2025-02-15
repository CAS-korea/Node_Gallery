// src/App.tsx
import '/Users/sejinkim/IdeaProjects/NodeFrontend/src/pages/Index.css'
import { BrowserRouter } from "react-router-dom";
import { ServicesProvider } from "./contextAPI/ServicesProvider.tsx";
import Router from "../src/router/Router.tsx"; // Router 컴포넌트를 별도 파일에서 import
import CustomCursor from './components/CustomCursor.tsx';
import { ThemeProvider } from './layouts/ThemeContext'; // 전역 테마 컨텍스트

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <CustomCursor />
                <BrowserRouter>
                    <ServicesProvider>
                        <Router />
                    </ServicesProvider>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
