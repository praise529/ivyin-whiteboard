import { CheckCircle, PencilSimple, Spinner } from "phosphor-react";
import { useState } from "react";
import { useParams } from "react-router";

const WhiteboardScreen = () => {
    const { id } = useParams();
    const [Saved, SetSaved] = useState(false);

    function ChangeSaved() {
        SetSaved(Saved ? false : true);
    }
    return (
        <div className="Whiteboard-Area">
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
                <div className="Whiteboard-Option">
                    <PencilSimple
                        weight="bold"
                        size={32}
                        className="Dark"
                    ></PencilSimple>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardScreen;
