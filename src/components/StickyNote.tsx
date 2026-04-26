import React, { useEffect, useRef } from "react";

type StickyNoteTypes = {
    DefaultText?: string;
} & React.ComponentPropsWithoutRef<"div">;

const StickyNote = ({ DefaultText = "Hi!", ...props }: StickyNoteTypes) => {
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

    const StickyNoteChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        resize(e.currentTarget);
    };

    return (
        <div className="Sticky-Note" {...props}>
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
