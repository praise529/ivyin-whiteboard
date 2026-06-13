import { Plus, Eyedropper, Copy, Trash } from "phosphor-react";

type Types = {
    ThingSelected: any;
};

const PropertiesPanel = ({ ThingSelected }: Types) => {
    return (
        <div className="Whiteboard-Properties">
            <div className="Property">
                <h4>Actions</h4>
                <div className="Options">
                    <div className="Option">
                        <Copy weight="bold" />
                    </div>
                    <div className="Option">
                        <Trash weight="bold" />
                    </div>
                </div>
            </div>
            <div className="Property">
                <h4>Size</h4>
                <div className="Options">
                    <div className="Option">
                        <Plus weight="bold" />
                    </div>
                    <div
                        className={`Option ${ThingSelected.size === 24 ? "selected" : ""}`}
                    >
                        S
                    </div>
                    <div className="Option">M</div>
                    <div className="Option">L</div>
                </div>
            </div>
            <div className="Property">
                <h4>Colour</h4>
                <div className="Options">
                    <div className="Option">
                        <Eyedropper weight="bold" />
                    </div>
                    <div
                        className="Option No-Border"
                        style={{ background: "hsl(0,100%,0%)" }}
                    ></div>
                    <div
                        className="Option No-Border"
                        style={{ background: "hsl(220,100%,69%)" }}
                    ></div>
                    <div
                        className="Option No-Border"
                        style={{ background: "hsl(260,100%,69%)" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesPanel;
