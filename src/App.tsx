import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ServicesProvider } from "./contextAPI/ServicesProvider.tsx";
import Router from "../src/router/Router.tsx"; // Router 컴포넌트를 별도 파일에서 import

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ServicesProvider>
                    <Router />
                </ServicesProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
