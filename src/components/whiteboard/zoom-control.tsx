import { ArrowUUpLeft, ArrowUUpRight, Minus, Plus } from "phosphor-react";

type ZoomControlTypes = {
    Zoom: number;
    SetZoom: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomControl = ({ Zoom, SetZoom }: ZoomControlTypes) => {
    return (
        <div className="Whiteboard-Zoom">
            <div>
                <button title="Undo">
                    <ArrowUUpLeft weight="bold" size={20} />
                </button>
                <button title="Redo">
                    <ArrowUUpRight weight="bold" size={20} />
                </button>
            </div>
            <span className="Line">|</span>
            <div
                style={{
                    gap: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <button
                    onClick={() => SetZoom((prev: number) => prev - 25)}
                    title="Zoom Out"
                >
                    <Minus weight="bold" size={16} />
                </button>
                <span>
                    <input
                        type="number"
                        min={0}
                        max={500}
                        title="Zoom"
                        value={Zoom}
                        onChange={(e) => SetZoom(Number(e.target.value))}
                    />
                </span>
                <button
                    onClick={() => SetZoom((prev: number) => prev + 25)}
                    title="Zoom In"
                >
                    <Plus weight="bold" size={16} />
                </button>
            </div>
        </div>
    );
};

export default ZoomControl;
