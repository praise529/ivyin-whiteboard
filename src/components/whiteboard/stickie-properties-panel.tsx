import { Plus, Eyedropper, Copy, Trash } from "phosphor-react";
import type { ThingSelectedType } from "../../types";

type Types = {
    ThingSelected: ThingSelectedType;
};

const StickiePropertiesPanel = ({ ThingSelected }: Types) => {
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
                    {/* <div className="Option"><Flip /></div>
                    <div className="Option">L</div> */}
                </div>
            </div>
            <div className="Property">
                <h4>Background</h4>
                <div className="Options">
                    <div className="Option">
                        <Plus weight="bold" />
                    </div>
                    <div className="Option">
                        <Eyedropper weight="bold" />
                    </div>
                    <div
                        className={`Option ${ThingSelected?.bgcolor === "hsl(45, 80%, 90%)" ? "selected" : "selected"}`}
                        style={{
                            background: "var(--Stickie)",
                            // border: "2.5px solid hsl(from var(--Stickie) h s calc(l - 10) / 1)",
                        }}
                    ></div>
                    {/*
                    <div
                        className="Option No-Border"
                        style={{ background: "hsl(220,100%,69%)" }}
                    ></div>
                    <div
                        className="Option No-Border"
                        style={{ background: "hsl(260,100%,69%)" }}
                    ></div> */}
                </div>
            </div>
        </div>
    );
};

export default StickiePropertiesPanel;
