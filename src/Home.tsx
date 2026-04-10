import { PlusCircle } from "phosphor-react";
import "./App.css";
import Whiteboard from "./components/Whiteboard";

function Home() {
    return (
        <div>
            <div className="Top-Bar">
                <h1>Whiteboards</h1>

                <button className="Primary">
                    <PlusCircle weight="bold" size={22} className="Plus" />
                    <p>Create Whiteboards</p>
                </button>
            </div>
            <div className="All-Whiteboards">
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 12"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
                <Whiteboard Name="Whiteboard 1"></Whiteboard>
            </div>
        </div>
    );
}

export default Home;
