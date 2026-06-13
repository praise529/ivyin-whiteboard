// Whiteboard.tsx
export type StateTypes = "Not Yet." | "Done!" | "Error..." | null;

export type ToolTypes =
    | "Select"
    | "Sketch"
    | "Eraser"
    | "Stickie"
    | "Text"
    | "Square"
    | "Circle"
    | "Arrow"
    | "Hand"
    | null;

export type ThingSelectedType = {
        type: ToolTypes;
        id: number;
        size?: number;
        bgcolor?: "hsl(45, 80%, 90%)" | string;
    } | null