import {
    Cursor,
    PencilSimple,
    Eraser,
    NoteBlank,
    TextT,
    Square,
    Circle,
    ArrowRight,
    Hand,
} from "phosphor-react";
import type { ToolTypes } from "../../types";

type ToolbarTypes = {
    ToolActive: ToolTypes;
    SetToolActive: React.Dispatch<React.SetStateAction<ToolTypes>>;
};

const Toolbar = ({ ToolActive, SetToolActive }: ToolbarTypes) => {
    return (
        <div className="Whiteboard-Options">
            <div
                className={`Whiteboard-Option ${ToolActive === "Select" && "Active"}`}
                title="Select"
                onClick={() => SetToolActive("Select")}
            >
                <Cursor weight="bold" size={28} className="Dark"></Cursor>
            </div>
            <div
                className={`Whiteboard-Option ${ToolActive === "Hand" && "Active"}`}
                title="Hand"
                onClick={() => SetToolActive("Hand")}
            >
                <Hand weight="bold" size={28} className="Dark"></Hand>
            </div>
            <div
                className={`Whiteboard-Option ${ToolActive === "Sketch" && "Active"}`}
                title="Sketch"
                onClick={() => SetToolActive("Sketch")}
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
                className={`Whiteboard-Option ${ToolActive === "Stickie" && "Active"}`}
                title="Stickie"
                onClick={() => SetToolActive("Stickie")}
            >
                <NoteBlank weight="bold" size={28} className="Dark"></NoteBlank>
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
                <Square
                    weight={ToolActive === "Square" ? "fill" : "bold"}
                    size={28}
                    className="Dark"
                ></Square>
            </div>
            <div
                className={`Whiteboard-Option ${ToolActive === "Circle" && "Active"}`}
                title="Circle"
                onClick={() => SetToolActive("Circle")}
            >
                <Circle
                    weight={ToolActive === "Circle" ? "fill" : "bold"}
                    size={28}
                    className="Dark"
                ></Circle>
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
    );
};

export default Toolbar;
