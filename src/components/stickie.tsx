import React, { useEffect, useRef } from "react";

type StickieTypes = {
    DefaultText?: string;
} & React.ComponentPropsWithoutRef<"div">;

const Stickie = ({ DefaultText = "Hi!", ...props }: StickieTypes) => {
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

    const StickieChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        resize(e.currentTarget);
    };

    return (
        <div className="Stickie" {...props}>
            <textarea
                ref={textRef}
                defaultValue={DefaultText}
                className="Text"
                rows={1}
                onInput={StickieChange}
            />
        </div>
    );
};

export default Stickie;
