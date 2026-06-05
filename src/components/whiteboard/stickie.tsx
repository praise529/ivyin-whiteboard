import React, { useEffect, useRef } from "react";

type StickieTypes = {
    DefaultText?: string;
} & React.ComponentPropsWithoutRef<"div">;

const Stickie = ({ DefaultText = "", ...props }: StickieTypes) => {
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

    const stickieClicked = () => {
        textRef.current?.focus();
    };

    return (
        <div className="Stickie" {...props} onClick={stickieClicked}>
            <textarea
                ref={textRef}
                defaultValue={DefaultText}
                className="Text"
                rows={1}
                placeholder="Any thoughts?"
                onChange={StickieChange}
            />
        </div>
    );
};

export default Stickie;
