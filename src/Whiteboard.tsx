import { CheckCircle, Spinner } from "phosphor-react";
import { useParams } from "react-router";
import "./App.css";
import ZoomControl from "./components/whiteboard/zoom-control";
import LoadingScreen from "./components/whiteboard/status-screens/loading-screen";
import ErrorScreen from "./components/whiteboard/status-screens/error-screen";
import Toolbar from "./components/whiteboard/toolbar";
import PropertiesPanel from "./components/whiteboard/properties-panel";
import { useWhiteboard } from "./hooks/useWhiteboard";
import { StickyNoteLayer } from "./components/whiteboard/layers/sticky-note-layer";

const WhiteboardScreen = () => {
    const { id } = useParams();
    const {
        Zoom,
        SetZoom,
        WhiteboardRef,
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
    } = useWhiteboard();

    if (State === "Error...") return <ErrorScreen />;
    if (State === "Not Yet.") return <LoadingScreen />;

    return (
        <div className="Whiteboard-Area">
            <div
                className="Whiteboard"
                onClick={(e) => CheckStufff(e)}
                ref={WhiteboardRef}
                style={{ zoom: Zoom / 100 }}
            >
                <StickyNoteLayer
                    Notes={Elements.StickyNotes}
                    ThingSelected={ThingSelected}
                    OnSelect={(id) => {
                        SetItemSelected(true);
                        SetThingSelected({ type: "StickyNote", id });
                    }}
                />
                {Elements.TextBlocks.length > 0 ? (
                    <div>
                        {Elements.TextBlocks.map((Text, index) => (
                            <div
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: Text.x,
                                    top: Text.y,
                                    fontFamily: "Schoolbell",
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
                                    style={{ fontSize: Text.size }}
                                    className={`Text-Block ${ThingSelected?.id === Text._id ? "selected" : ""}`}
                                    defaultValue={Text.content}
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
            <div className="Whiteboard-Top">
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
            </div>

            <Toolbar ToolActive={ToolActive} SetToolActive={SetToolActive} />

            <ZoomControl Zoom={Zoom} SetZoom={SetZoom} />
            {ItemSelected && ThingSelected?.type === "Text" && (
                <PropertiesPanel ThingSelected={ThingSelected} />
            )}
        </div>
    );
};

export default WhiteboardScreen;
