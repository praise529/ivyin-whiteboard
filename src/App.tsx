import { Route, Routes } from "react-router";
import Home from "./Home";
import EditWhiteboard from "./Whiteboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<EditWhiteboard />}></Route>
            <Route path="/whiteboards" element={<Home />}></Route>
        </Routes>
    );
}

export default App;
