import { Plus } from "phosphor-react";
import "./App.css";

function Home() {
    return (
        <div>
            <div className="Top-Bar">
                <h1>Whiteboards</h1>

                <div>
                    <button className="Primary">
                        <Plus weight="bold" size={14} className="Plus" />
                        <p>Create Whiteboard</p>
                    </button>
                    {/* <button>
                        <Moon weight="bold"></Moon>
                    </button> */}
                </div>
            </div>
            <div className="All-Whiteboards">
                {/* {Whiteboards.length > 0 ? (
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
                )} */}
            </div>
        </div>
    );
}

export default Home;
