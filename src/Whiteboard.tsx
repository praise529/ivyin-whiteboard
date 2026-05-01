import {
    ArrowRight,
    CheckCircle,
    Circle,
    Cursor,
    Diamond,
    Eraser,
    NoteBlank,
    PencilSimple,
    Spinner,
    Square,
    TextT,
    XCircle,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import StickyNote from "./components/StickyNote";

type ToolTypes =
    | "Select"
    | "Pen"
    | "Eraser"
    | "Sticky-Note"
    | "Text"
    | "Square"
    | "Circle"
    | "Diamond"
    | "Line"
    | "Arrow"
    | null;
type StateTypes = "Not Yet." | "Done!" | "Error..." | null;
const KeyboardShortcuts = {
    Select: "s",
    Pen: "p",
    Eraser: "e",
    Note: "s",
    Text: "t",
};

const WhiteboardScreen = () => {
    const { id } = useParams();
    const [Zoom, SetZoom] = useState<number>(0);
    const WhiteboardRef = useRef(null);
    const [StickyNotes, SetStickyNotes] = useState<any[]>([]);
    const [ToolActive, SetToolActive] = useState<ToolTypes>("Select");
    const [Saved, SetSaved] = useState(false);
    const [State, SetState] = useState<StateTypes>("Not Yet.");

    useEffect(() => {
        const handler = (e: KeyboardEvent) => CheckKeys(e);
        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, []);

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
    function CheckStufff(e: React.MouseEvent) {
        ChangeSaved();
        if (ToolActive === "Pen") {
            alert("Not yet pen");
        } else if (ToolActive === "Eraser") {
            alert("Not yet eraser");
        } else if (ToolActive === "Sticky-Note") {
            SpawnStickyNote(e);
        }
    }
    function CheckKeys(e: KeyboardEvent) {
        const key = e.key;
        if (e.target === WhiteboardRef.current) {
            if (key === KeyboardShortcuts.Pen || key === "Digit1") {
                SetToolActive("Pen");
            } else if (key === KeyboardShortcuts.Eraser) {
                SetToolActive("Eraser");
            } else if (key === KeyboardShortcuts.Note) {
                SetToolActive("Sticky-Note");
            } else if (key === "Escape") {
                SetToolActive(null);
            } else if (e.ctrlKey) {
                alert("HI");
            } else if (key === KeyboardShortcuts.Select) {
                SetToolActive("Select");
            }
        }
    }
    function SpawnStickyNote(e: React.MouseEvent) {
        if (e.target === WhiteboardRef.current) {
            const NOTE_WIDTH = 224;
            const NOTE_HEIGHT = 224;

            SetStickyNotes((prev) => [
                ...prev,
                {
                    x: e.clientX - NOTE_WIDTH / 2,
                    y: e.clientY - NOTE_HEIGHT / 2,
                    content: "",
                    _id: Date.now(),
                },
            ]);
        }
    }

    return (
        <div className="Whiteboard-Area">
            <div
                className="Whiteboard"
                onClick={(e) => CheckStufff(e)}
                ref={WhiteboardRef}
                style={{ zoom: Zoom }}
            >
                {StickyNotes.length > 0 ? (
                    <div>
                        {StickyNotes.map((Note, index) => (
                            <div>
                                <StickyNote
                                    style={{
                                        position: "absolute",
                                        left: Note.x,
                                        top: Note.y,
                                    }}
                                    key={index}
                                    DefaultText={Note.Content}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
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
                    className={`Whiteboard-Option ${ToolActive === "Select" && "Active"}`}
                    title="Select"
                    onClick={() => SetToolActive("Select")}
                >
                    <Cursor weight="bold" size={28} className="Dark"></Cursor>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Pen" && "Active"}`}
                    title="Pen"
                    onClick={() => SetToolActive("Pen")}
                >
                    <PencilSimple
                        weight="bold"
                        size={28}
                        className="Dark"
                    ></PencilSimple>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Eraser" && "Active"}`}
                    title="Eraser"
                    onClick={() => SetToolActive("Eraser")}
                >
                    <Eraser weight="bold" size={28} className="Dark"></Eraser>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Sticky-Note" && "Active"}`}
                    title="Sticky Note"
                    onClick={() => SetToolActive("Sticky-Note")}
                >
                    <NoteBlank
                        weight="bold"
                        size={28}
                        className="Dark"
                    ></NoteBlank>
                </div>

                <div
                    className={`Whiteboard-Option ${ToolActive === "Text" && "Active"}`}
                    title="Text"
                    onClick={() => SetToolActive("Text")}
                >
                    <TextT weight="bold" size={28} className="Dark"></TextT>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Square" && "Active"}`}
                    title="Square"
                    onClick={() => SetToolActive("Square")}
                >
                    <Square weight="bold" size={28} className="Dark"></Square>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Circle" && "Active"}`}
                    title="Circle"
                    onClick={() => SetToolActive("Circle")}
                >
                    <Circle weight="bold" size={28} className="Dark"></Circle>
                </div>
                <div
                    className={`Whiteboard-Option ${ToolActive === "Arrow" && "Active"}`}
                    title="Arrow"
                    onClick={() => SetToolActive("Arrow")}
                >
                    <ArrowRight
                        weight="bold"
                        size={28}
                        className="Dark"
                    ></ArrowRight>
                </div>
            </div>
            <div className="Whiteboard-Zoom">
                <button onClick={() => SetZoom((prev) => prev - 25)}>-</button>
                <span>
                    <input
                        type="number"
                        min={0}
                        max={500}
                        defaultValue={Zoom}
                    />
                </span>
                <button onClick={() => SetZoom((prev) => prev + 25)}>+</button>
            </div>
        </div>
    );
};

export default WhiteboardScreen;
