import {
    CheckCircle,
    DotsNine,
    Eraser,
    NoteBlank,
    PencilSimple,
    Spinner,
    XCircle,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type ToolTypes = "Pen" | "Eraser" | "Sticky-Note" | "More" | null;
type StateTypes = "Not Yet." | "Done!" | "Error..." | null;

const WhiteboardScreen = () => {
    const { id } = useParams();
    const [ToolActive, SetToolActive] = useState<ToolTypes>("Pen");
    const [Saved, SetSaved] = useState(false);
    const [State, SetState] = useState<StateTypes>("Not Yet.");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((Stream) => {
                return Stream.json();
            })
            .then((Data) => {
                console.log(Data);
                SetState("Done!");
            })
            .catch((Err) => {
                console.error(Err);
                SetState("Error...");
            });
    }, []);
    if (State === "Error...") {
        return (
            <div
                style={{
                    gap: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <XCircle color="red" weight="bold" size={60}></XCircle>
                <h2 style={{ color: "red" }}>Something went wrong...</h2>
            </div>
        );
    }

    if (State === "Not Yet.") {
        return (
            <div
                style={{
                    gap: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Spinner
                    weight="bold"
                    size={60}
                    className="Spin Dark"
                ></Spinner>
                <h2>Drawing...</h2>
            </div>
        );
    }

    function ChangeSaved() {
        SetSaved(Saved ? false : true);
    }

    function CheckStufff() {
        ChangeSaved();
        if (ToolActive === "Pen") {
            alert("Not yet pen");
        } else if (ToolActive === "Eraser") {
            alert("Not yet eraser");
        } else if (ToolActive === "Sticky-Note") {
            alert("STICKY NOTE :DDDDDDDDDDDDDDDDDDDDDDD");
        } else if (ToolActive === "More") {
            alert("Not yet more");
        }
    }

    return (
        <div className="Whiteboard-Area">
            <div className="Whiteboard" onClick={CheckStufff}></div>
            <div className="Whiteboard-Top">
                <input defaultValue={id} className="Whiteboard-Name"></input>
                <div>
                    {Saved ? (
                        <CheckCircle
                            color="Green"
                            weight="bold"
                            size={20}
                        ></CheckCircle>
                    ) : (
                        <Spinner
                            color="Grey"
                            weight="bold"
                            size={20}
                            className="Spin"
                        ></Spinner>
                    )}
                </div>
            </div>
            <div className="Whiteboard-Options">
                <div
                    className={`Whiteboard-Option ${ToolActive === "Pen" && "Active"}`}
                    title="Pen"
                    onClick={() => SetToolActive("Pen")}
                >
                    <PencilSimple
                        weight="bold"
                        size={32}
                        className="Dark"
                    ></PencilSimple>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Eraser" && "Active"}`}
                    title="Eraser"
                    onClick={() => SetToolActive("Eraser")}
                >
                    <Eraser weight="bold" size={32} className="Dark"></Eraser>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Sticky-Note" && "Active"}`}
                    title="Sticky Note"
                    onClick={() => SetToolActive("Sticky-Note")}
                >
                    <NoteBlank
                        weight="bold"
                        size={32}
                        className="Dark"
                    ></NoteBlank>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "More" && "Active"}`}
                    title="More Options"
                    onClick={() => {
                        SetToolActive("More");
                    }}
                >
                    <DotsNine
                        weight="bold"
                        size={32}
                        className="Dark"
                    ></DotsNine>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardScreen;
