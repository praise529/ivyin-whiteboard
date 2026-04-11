import { useEffect, useRef } from "react";

type StickyNoteTypes = {
    DefaultText?: string;
};

const StickyNote = ({ DefaultText = "Hi!" }: StickyNoteTypes) => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const resize = (el: HTMLTextAreaElement) => {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    useEffect(() => {
        if (textRef.current) {
            resize(textRef.current);
        }
    }, []);

    const StickyNoteChange = (e: any) => {
        resize(e.target);
    };

    return (
        <div className="Sticky-Note">
            <textarea
                ref={textRef}
                defaultValue={DefaultText}
                className="Text"
                rows={1}
                onInput={StickyNoteChange}
            />
        </div>
    );
};

export default StickyNote;
