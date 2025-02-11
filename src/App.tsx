import './main.css'
import { BrowserRouter } from "react-router-dom";
import { ServicesProvider } from "./context/ServicesProvider.tsx";
import Router from "../src/router/Router.tsx"; // Router 컴포넌트를 별도 파일에서 import
import CustomCursor from './components/CustomCursor.tsx';

function App() {
    return (
        <div className="App">
            <CustomCursor />
                {/* ✅ 프론트엔드 라우터 설정 */}
                <BrowserRouter>
                    {/* ✅ 백엔드 API 연결 및 전역 상태 관리 */}
                    <ServicesProvider>
                        <Router />
                    </ServicesProvider>
                </BrowserRouter>
        </div>
    );
}

export default App;
