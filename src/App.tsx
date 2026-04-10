import { Route, Routes } from "react-router";
import Home from "./Home";
import WhiteboardScreen from "./Whiteboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
                path="/whiteboard/:id"
                element={<WhiteboardScreen />}
            ></Route>
        </Routes>
    );
}

export default App;
