import {
    CheckCircle,
    DotsNine,
    Eraser,
    NoteBlank,
    PencilSimple,
    Spinner,
    TextT,
    XCircle,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import StickyNote from "./components/StickyNote";

type ToolTypes = "Pen" | "Eraser" | "Sticky-Note" | "Text" | "More" | null;
type StateTypes = "Not Yet." | "Done!" | "Error..." | null;
const KeyboardShortcuts = {
    Pen: "p",
    Eraser: "e",
    Note: "s",
    Text: "t",
};

const WhiteboardScreen = () => {
    const { id } = useParams();
    const WhiteboardRef = useRef(null);
    const [StickyNotes, SetStickyNotes] = useState<any[]>([]);
    const [ToolActive, SetToolActive] = useState<ToolTypes>("Pen");
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
        } else if (ToolActive === "More") {
            alert("Not yet more");
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
                    className={`Whiteboard-Option ${ToolActive === "More" && "Active"}`}
                    title="More Options"
                    onClick={() => {
                        SetToolActive("More");
                    }}
                >
                    <DotsNine
                        weight="bold"
                        size={28}
                        className="Dark"
                    ></DotsNine>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardScreen;
