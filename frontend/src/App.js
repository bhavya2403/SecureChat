import  {Routes, Route } from 'react-router-dom';
import CommonLogin from "./pages/CommonLogin";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<CommonLogin />} />
                <Route path="/messaging/*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
