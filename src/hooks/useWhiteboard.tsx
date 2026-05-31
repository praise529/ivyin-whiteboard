import { useEffect, useRef, useState } from "react";
import type { ToolTypes, StateTypes } from "../types";

const KEY_TO_TOOL: Record<string, ToolTypes> = {
    s: "Select",
    p: "Pen",
    e: "Eraser",
    n: "Sticky-Note",
    t: "Text",
};

const NOTE_WIDTH = 224;
const NOTE_HEIGHT = 224;

export function useWhiteboard() {
    const WhiteboardRef = useRef<HTMLDivElement>(null);
    const [Zoom, SetZoom] = useState(125);
    const [Elements, SetElements] = useState({
        StickyNotes: [] as any[],
        Shapes: [] as any[],
        TextBlocks: [] as any[],
    });
    const [ItemSelected, SetItemSelected] = useState(false);
    const [ThingSelected, SetThingSelected] = useState<{
        type: "StickyNote" | "Text";
        id: number;
        size?: number;
    } | null>(null);
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

    function CheckStufff(e: React.MouseEvent) {
        SetSaved((s) => !s);
        if (ItemSelected) {
            SetItemSelected(false);
            SetThingSelected(null);
            return;
        }
        if (ToolActive === "Sticky-Note") SpawnStickyNote(e);
        else if (ToolActive === "Text") SpawnText(e);
    }

    function SpawnStickyNote(e: React.MouseEvent) {
        if (e.target !== WhiteboardRef.current) return;
        SetElements((prev) => ({
            ...prev,
            StickyNotes: [
                ...prev.StickyNotes,
                {
                    x: e.clientX - NOTE_WIDTH / 2,
                    y: e.clientY - NOTE_HEIGHT / 2,
                    content: "",
                    _id: Date.now(),
                },
            ],
        }));
    }

    function SpawnText(e: React.MouseEvent) {
        if (e.target !== WhiteboardRef.current || ItemSelected) return;
        SetElements((prev) => ({
            ...prev,
            TextBlocks: [
                ...prev.TextBlocks,
                {
                    x: e.clientX,
                    y: e.clientY,
                    size: 24,
                    content: "Text",
                    _id: Date.now(),
                },
            ],
        }));
    }

    return {
        WhiteboardRef,
        Zoom,
        SetZoom,
        Elements,
        ItemSelected,
        SetItemSelected,
        ThingSelected,
        SetThingSelected,
        ToolActive,
        SetToolActive,
        Saved,
        State,
        CheckStufff,
    };
}
