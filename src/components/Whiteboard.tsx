import { useNavigate } from "react-router";
import TestImage from "../assets/hero.png";

type WhiteboardTypes = {
    Name: string;
    id?: RegExp | string;
};

const Whiteboard = ({ Name, id = "i28123456" }: WhiteboardTypes) => {
    const nav = useNavigate();
    return (
        <div
            className="Whiteboard-Item"
            onClick={() => nav(`/whiteboard/${id}`)}
            onDoubleClick={() => alert("Yay")}
        >
            <img src={TestImage} className="Whiteboard-Pic" />
            <br></br>
            <h3>{Name}</h3>
        </div>
    );
};

export default Whiteboard;
