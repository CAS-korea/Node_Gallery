import { BrowserRouter } from "react-router-dom";
import App from "../App"; // ../App으로 위치 변경

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;