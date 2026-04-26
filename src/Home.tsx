import { PlusCircle } from "phosphor-react";
import "./App.css";
// import Whiteboard from "./components/Whiteboard";
import { Link } from "react-router";
import { useState } from "react";

function Home() {
    const [Whiteboards, SetWhiteboards] = useState<any[]>([]);
    function name() {
        SetWhiteboards([]);
    }
    return (
        <div>
            <div className="Top-Bar">
                <h1>Whiteboards</h1>

                <Link to={"/"}>
                    <button className="Primary">
                        <PlusCircle weight="bold" size={22} className="Plus" />
                        <p>Create Whiteboard</p>
                    </button>
                </Link>
            </div>
            <div className="All-Whiteboards">
                {Whiteboards.length > 0 ? (
                    <>
                        hi <h1>h1</h1>
                    </>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h1>No Whiteboards... yet</h1>
                        <br></br>
                        <p className="Light">Maybe create a whiteboard?</p>
                        <button onClick={name}>For testing</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
