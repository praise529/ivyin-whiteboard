// import { useEffect, useRef, useState } from "react";
// import type { ToolTypes, StateTypes } from "../types";

// const KEY_TO_TOOL: Record<string, ToolTypes> = {
//     s: "Select",
//     p: "Sketch",
//     e: "Eraser",
//     n: "Stickie",
//     t: "Text",
// };

// const NOTE_WIDTH = 11 * 16;
// const NOTE_HEIGHT = 11 * 16;

// export function useWhiteboard() {
//     const WhiteboardRef = useRef<HTMLDivElement>(null);
//     const [Zoom, SetZoom] = useState(125);
//     const [Elements, SetElements] = useState({
//         StickyNotes: [] as any[],
//         Shapes: [] as any[],
//         TextBlocks: [] as any[],
//     });
//     const [ItemSelected, SetItemSelected] = useState(false);
//     const [ThingSelected, SetThingSelected] = useState<{
//         type: "StickyNote" | "Text";
//         id: number;
//         size?: number;
//     } | null>(null);
//     const [ToolActive, SetToolActive] = useState<ToolTypes>("Select");
//     const [Saved, SetSaved] = useState(false);
//     const [State, SetState] = useState<StateTypes>("Not Yet.");

//     useEffect(() => {
//         const handler = (e: KeyboardEvent) => {
//             if (
//                 e.target instanceof HTMLInputElement ||
//                 e.target instanceof HTMLTextAreaElement
//             )
//                 return;
//             if (e.key === "Escape") {
//                 SetToolActive(null);
//                 return;
//             }
//             const tool = KEY_TO_TOOL[e.key];
//             if (tool) SetToolActive(tool);
//         };
//         window.addEventListener("keydown", handler);
//         return () => window.removeEventListener("keydown", handler);
//     }, []);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/todos/1")
//             .then((r) => r.json())
//             .then(() => SetState("Done!"))
//             .catch(() => SetState("Error..."));
//     }, []);

//     function CheckStufff(e: React.MouseEvent) {
//         SetSaved((s) => !s);
//         if (ItemSelected) {
//             SetItemSelected(false);
//             SetThingSelected(null);
//             return;
//         }
//         if (ToolActive === "Stickie") SpawnStickyNote(e);
//         else if (ToolActive === "Text") SpawnText(e);
//     }

//     function SpawnStickyNote(e: React.MouseEvent) {
//         if (e.currentTarget !== WhiteboardRef.current) return;
//         SetElements((prev) => ({
//             ...prev,
//             StickyNotes: [
//                 ...prev.StickyNotes,
//                 {
//                     x: e.clientX - NOTE_WIDTH / 2,
//                     y: e.clientY - NOTE_HEIGHT / 2,
//                     content: "",
//                     _id: Date.now(),
//                 },
//             ],
//         }));
//     }

//     function SpawnText(e: React.MouseEvent) {
//         if (e.currentTarget !== WhiteboardRef.current || ItemSelected) return;
//         SetElements((prev) => ({
//             ...prev,
//             TextBlocks: [
//                 ...prev.TextBlocks,
//                 {
//                     x: e.clientX,
//                     y: e.clientY,
//                     size: 24,
//                     content: "Text",
//                     _id: Date.now(),
//                 },
//             ],
//         }));
//     }

//     return {
//         WhiteboardRef,
//         Zoom,
//         SetZoom,
//         Elements,
//         ItemSelected,
//         SetItemSelected,
//         ThingSelected,
//         SetThingSelected,
//         ToolActive,
//         SetToolActive,
//         Saved,
//         State,
//         CheckStufff,
//     };
// }

// import { useEffect, useRef, useState } from "react";
// import type { ToolTypes, StateTypes } from "../types";

// const KEY_TO_TOOL: Record<string, ToolTypes> = {
//     s: "Select",
//     p: "Sketch",
//     e: "Eraser",
//     n: "Stickie",
//     t: "Text",
//     h: "Hand",
// };

// const NOTE_WIDTH = 11 * 16;
// const NOTE_HEIGHT = 11 * 16;

// export function useWhiteboard() {
//     const WhiteboardRef = useRef<HTMLDivElement>(null);
//     const [Zoom, SetZoom] = useState(100);
//     const [Pan, SetPan] = useState({ x: 0, y: 0 });
//     const isPanning = useRef(false);
//     const lastPos = useRef({ x: 0, y: 0 });

//     const [Elements, SetElements] = useState({
//         StickyNotes: [] as any[],
//         Shapes: [] as any[],
//         TextBlocks: [] as any[],
//     });
//     const [ItemSelected, SetItemSelected] = useState(false);
//     const [ThingSelected, SetThingSelected] = useState<{
//         type: "StickyNote" | "Text";
//         id: number;
//         size?: number;
//     } | null>(null);
//     const [ToolActive, SetToolActive] = useState<ToolTypes>("Select");
//     const [Saved, SetSaved] = useState(false);
//     const [State, SetState] = useState<StateTypes>("Not Yet.");

//     useEffect(() => {
//         const handler = (e: KeyboardEvent) => {
//             if (
//                 e.target instanceof HTMLInputElement ||
//                 e.target instanceof HTMLTextAreaElement
//             )
//                 return;
//             if (e.key === "Escape") {
//                 SetToolActive(null);
//                 return;
//             }
//             const tool = KEY_TO_TOOL[e.key];
//             if (tool) SetToolActive(tool);
//         };
//         window.addEventListener("keydown", handler);
//         return () => window.removeEventListener("keydown", handler);
//     }, []);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/todos/1")
//             .then((r) => r.json())
//             .then(() => SetState("Done!"))
//             .catch(() => SetState("Error..."));
//     }, []);

//     const onMouseDown = (e: React.MouseEvent) => {
//         if (ToolActive !== "Select" && ToolActive !== "Hand") return;
//         isPanning.current = true;
//         lastPos.current = { x: e.clientX, y: e.clientY };
//     };

//     const onMouseMove = (e: React.MouseEvent) => {
//         if (!isPanning.current) return;
//         SetPan((prev) => ({
//             x: prev.x + e.clientX - lastPos.current.x,
//             y: prev.y + e.clientY - lastPos.current.y,
//         }));
//         lastPos.current = { x: e.clientX, y: e.clientY };
//     };

//     const onMouseUp = () => {
//         isPanning.current = false;
//     };

//     const onWheel = (e: React.WheelEvent) => {
//         SetZoom((prev) => Math.min(200, Math.max(25, prev - e.deltaY * 0.1)));
//     };

//     function CheckStufff(e: React.MouseEvent) {
//         SetSaved((s) => !s);
//         if (ItemSelected) {
//             SetItemSelected(false);
//             SetThingSelected(null);
//             return;
//         }
//         if (ToolActive === "Stickie") SpawnStickyNote(e);
//         else if (ToolActive === "Text") SpawnText(e);
//     }

//     function SpawnStickyNote(e: React.MouseEvent) {
//         if (e.target !== e.currentTarget) return;
//         const rect = WhiteboardRef.current!.getBoundingClientRect();
//         SetElements((prev) => ({
//             ...prev,
//             StickyNotes: [
//                 ...prev.StickyNotes,
//                 {
//                     x:
//                         (e.clientX - rect.left - Pan.x) / (Zoom / 100) -
//                         NOTE_WIDTH / 2,
//                     y:
//                         (e.clientY - rect.top - Pan.y) / (Zoom / 100) -
//                         NOTE_HEIGHT / 2,
//                     content: "",
//                     _id: Date.now(),
//                 },
//             ],
//         }));
//     }

//     function SpawnText(e: React.MouseEvent) {
//         if (e.target !== e.currentTarget || ItemSelected) return;
//         const rect = WhiteboardRef.current!.getBoundingClientRect();
//         SetElements((prev) => ({
//             ...prev,
//             TextBlocks: [
//                 ...prev.TextBlocks,
//                 {
//                     x: (e.clientX - rect.left - Pan.x) / (Zoom / 100),
//                     y: (e.clientY - rect.top - Pan.y) / (Zoom / 100),
//                     size: 24,
//                     content: "Text",
//                     _id: Date.now(),
//                 },
//             ],
//         }));
//     }

//     return {
//         WhiteboardRef,
//         Zoom,
//         SetZoom,
//         Pan,
//         Elements,
//         ItemSelected,
//         SetItemSelected,
//         ThingSelected,
//         SetThingSelected,
//         ToolActive,
//         SetToolActive,
//         Saved,
//         State,
//         CheckStufff,
//         onMouseDown,
//         onMouseMove,
//         onMouseUp,
//         onWheel,
//     };
// }

import { useEffect, useRef, useState } from "react";
import type { ToolTypes, StateTypes, ThingSelectedType } from "../types";

const KEY_TO_TOOL: Record<string, ToolTypes> = {
    s: "Select",
    p: "Sketch",
    e: "Eraser",
    n: "Stickie",
    t: "Text",
    h: "Hand",
};

const NOTE_WIDTH = 11 * 16;
const NOTE_HEIGHT = 11 * 16;

export function useWhiteboard() {
    const WhiteboardRef = useRef<HTMLDivElement>(null);
    const [Zoom, SetZoom] = useState(100);
    const [Pan, SetPan] = useState({ x: 0, y: 0 });
    const isPanning = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const [Elements, SetElements] = useState({
        StickyNotes: [] as any[],
        Shapes: [] as any[],
        TextBlocks: [] as any[],
    });
    const [Paths, SetPaths] = useState<{ d: string; _id: number }[]>([]);
    const [CurrentPath, SetCurrentPath] = useState<string | null>(null);
    const isDrawing = useRef(false);

    const [ItemSelected, SetItemSelected] = useState(false);
    const [ThingSelected, SetThingSelected] = useState<ThingSelectedType>(null);
    const [ToolActive, SetToolActive] = useState<ToolTypes>("Select");
    const [Saved, SetSaved] = useState(false);
    const [State, SetState] = useState<StateTypes>("Not Yet.");

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            )
                return;
            if (e.key === "Escape") {
                SetToolActive(null);
                return;
            }
            const tool = KEY_TO_TOOL[e.key];
            if (tool) SetToolActive(tool);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((r) => r.json())
            .then(() => SetState("Done!"))
            .catch(() => SetState("Error..."));
    }, []);

    const getCanvasPos = (e: React.MouseEvent) => {
        const rect = WhiteboardRef.current!.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left - Pan.x) / (Zoom / 100),
            y: (e.clientY - rect.top - Pan.y) / (Zoom / 100),
        };
    };

    const onMouseDown = (e: React.MouseEvent) => {
        if (ToolActive === "Select" || ToolActive === "Hand") {
            isPanning.current = true;
            lastPos.current = { x: e.clientX, y: e.clientY };
        } else if (ToolActive === "Sketch") {
            isDrawing.current = true;
            const { x, y } = getCanvasPos(e);
            SetCurrentPath(`M ${x} ${y}`);
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isPanning.current) {
            SetPan((prev) => ({
                x: prev.x + e.clientX - lastPos.current.x,
                y: prev.y + e.clientY - lastPos.current.y,
            }));
            lastPos.current = { x: e.clientX, y: e.clientY };
        } else if (isDrawing.current) {
            const { x, y } = getCanvasPos(e);
            SetCurrentPath((prev) => prev + ` L ${x} ${y}`);
        }
    };

    const onMouseUp = () => {
        if (isDrawing.current && CurrentPath) {
            SetPaths((prev) => [...prev, { d: CurrentPath, _id: Date.now() }]);
            SetCurrentPath(null);
            isDrawing.current = false;
        }
        isPanning.current = false;
    };

    const onWheel = (e: React.WheelEvent) => {
        SetZoom((prev) => Math.min(200, Math.max(25, prev - e.deltaY * 0.1)));
    };

    function CheckStufff(e: React.MouseEvent) {
        SetSaved((s) => !s);
        if (ItemSelected) {
            SetItemSelected(false);
            SetThingSelected(null);
            return;
        }
        if (ToolActive === "Stickie") SpawnStickyNote(e);
        else if (ToolActive === "Text") SpawnText(e);
    }

    function SpawnStickyNote(e: React.MouseEvent) {
        if (e.target !== e.currentTarget) return;
        const { x, y } = getCanvasPos(e);
        SetElements((prev) => ({
            ...prev,
            StickyNotes: [
                ...prev.StickyNotes,
                {
                    x: x - NOTE_WIDTH / 2,
                    y: y - NOTE_HEIGHT / 2,
                    content: "",
                    _id: Date.now(),
                    bgcolor: "var(--Stickie)",
                },
            ],
        }));
        console.log(Elements);
    }

    function SpawnText(e: React.MouseEvent) {
        if (e.target !== e.currentTarget || ItemSelected) return;
        const { x, y } = getCanvasPos(e);
        SetElements((prev) => ({
            ...prev,
            TextBlocks: [
                ...prev.TextBlocks,
                {
                    x,
                    y,
                    size: 24,
                    content: "Text",
                    _id: Date.now(),
                },
            ],
        }));
        console.log(Elements);
    }

    return {
        WhiteboardRef,
        Zoom,
        SetZoom,
        Pan,
        Elements,
        Paths,
        CurrentPath,
        ItemSelected,
        SetItemSelected,
        ThingSelected,
        SetThingSelected,
        ToolActive,
        SetToolActive,
        Saved,
        State,
        CheckStufff,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onWheel,
        SetElements,
    };
}
