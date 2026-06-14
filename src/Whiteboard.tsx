// import { CheckCircle, Spinner } from "phosphor-react";
// import { useParams } from "react-router";
import "./App.css";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import ZoomControl from "./components/whiteboard/zoom-control";
import LoadingScreen from "./components/whiteboard/status-screens/loading-screen";
import ErrorScreen from "./components/whiteboard/status-screens/error-screen";
import Toolbar from "./components/whiteboard/toolbar";
import PropertiesPanel from "./components/whiteboard/text-properties-panel";
import { useWhiteboard } from "./hooks/useWhiteboard";
import { StickyNoteLayer } from "./components/whiteboard/layers/sticky-note-layer";
import StickiePropertiesPanel from "./components/whiteboard/stickie-properties-panel";

const EditWhiteboard = () => {
    // const { id } = useParams();
    const {
        Zoom,
        // SetZoom,
        WhiteboardRef,
        Elements,
        ItemSelected,
        SetItemSelected,
        ThingSelected,
        SetThingSelected,
        ToolActive,
        SetToolActive,
        SetElements,
        // Saved,
        State,
        CheckStufff,

        Pan,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onWheel,

        // Paths,
        // CurrentPath,
    } = useWhiteboard();

    if (State === "Error...") return <ErrorScreen />;
    if (State === "Not Yet.") return <LoadingScreen />;
    // console.log(Elements);

    return (
        <div className="Whiteboard-Area">
            <div
                className="Whiteboard"
                ref={WhiteboardRef}
                style={{
                    cursor: ToolActive === "Hand" ? "grab" : "default",
                    backgroundSize: `${24 * (Zoom / 100)}px ${24 * (Zoom / 100)}px`,
                    backgroundPosition: `${Pan.x}px ${Pan.y}px`,
                    backgroundImage:
                        Zoom < 50
                            ? "none"
                            : `radial-gradient(circle, hsl(from var(--Dark-White) h s calc(l - 30) / ${Math.min(0.45, Zoom / 100)}) 1px, transparent 1px)`,
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onWheel={onWheel}
                onClick={CheckStufff}
            >
                <div
                    style={{
                        transform: `translate(${Pan.x}px, ${Pan.y}px) scale(${Zoom / 100})`,
                        transformOrigin: "0 0",
                    }}
                >
                    <StickyNoteLayer
                        Notes={Elements.StickyNotes}
                        ThingSelected={ThingSelected}
                        OnSelect={(id) => {
                            SetItemSelected(true);
                            SetThingSelected({ type: "Stickie", id });
                        }}
                    />
                    {Elements.TextBlocks.length > 0 ? (
                        <div>
                            {Elements.TextBlocks.map((Text) => (
                                <div
                                    key={Text._id}
                                    style={{
                                        position: "absolute",
                                        left: Text.x,
                                        top: Text.y,
                                        transform: "translate(-50%, -50%)",
                                        width: "max-content",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        SetItemSelected(true);
                                        SetThingSelected({
                                            type: "Text",
                                            id: Text._id,
                                            size: Text.size,
                                        });
                                    }}
                                >
                                    <input
                                        type="text"
                                        autoFocus
                                        onFocus={(e) => {
                                            e.target.select();
                                            SetItemSelected(true);
                                            SetThingSelected({
                                                type: "Text",
                                                id: Text._id,
                                                size: Text.size,
                                            });
                                        }}
                                        style={{
                                            fontSize: Text.size,
                                            cursor:
                                                ToolActive === "Text"
                                                    ? "text"
                                                    : "move",
                                        }}
                                        className={`Text-Block ${ThingSelected?.id === Text._id ? "selected" : ""}`}
                                        value={Text.content}
                                        onChange={(e) => {
                                            SetElements((prev: any) => ({
                                                ...prev,
                                                TextBlocks: prev.TextBlocks.map(
                                                    (t: any) =>
                                                        t._id === Text._id
                                                            ? {
                                                                  ...t,
                                                                  content:
                                                                      e.target
                                                                          .value,
                                                              }
                                                            : t,
                                                ),
                                            }));
                                        }}
                                    />
                                    {ThingSelected?.id === Text._id && (
                                        <>
                                            <div className="Resize-Handle top-left" />
                                            <div className="Resize-Handle top-right" />
                                            <div className="Resize-Handle bottom-left" />
                                            <div className="Resize-Handle bottom-right" />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            {/* <div className="Whiteboard-Top">
                <input
                    defaultValue={id}
                    className="Whiteboard-Name"
                    style={{ fontWeight: "bold" }}
                ></input>
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
            </div> */}

            <Toolbar ToolActive={ToolActive} SetToolActive={SetToolActive} />

            {/* <ZoomControl Zoom={Zoom} SetZoom={SetZoom} /> */}
            {ItemSelected && ThingSelected?.type === "Text" && (
                <PropertiesPanel ThingSelected={ThingSelected} />
            )}
            {ItemSelected && ThingSelected?.type === "Stickie" && (
                <StickiePropertiesPanel ThingSelected={ThingSelected} />
            )}
        </div>
    );
};

export default EditWhiteboard;
