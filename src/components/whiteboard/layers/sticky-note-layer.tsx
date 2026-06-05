import Stickie from "../stickie.tsx";

type Props = {
    Notes: any[];
    ThingSelected: { id: number } | null;
    OnSelect: (id: number) => void;
};

export const StickyNoteLayer = ({ Notes, OnSelect }: Props) => {
    if (Notes.length === 0) return null;
    return (
        <div>
            {Notes.map((Note) => (
                <div
                    key={Note._id}
                    onClick={(e) => {
                        e.stopPropagation();
                        OnSelect(Note._id);
                    }}
                >
                    <Stickie
                        style={{
                            position: "absolute",
                            left: Note.x,
                            top: Note.y,
                        }}
                        DefaultText={Note.content}
                    />
                </div>
            ))}
        </div>
    );
};
