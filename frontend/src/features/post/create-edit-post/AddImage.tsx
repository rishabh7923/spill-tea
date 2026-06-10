import { ImagePlusIcon } from "lucide-react";
import { useRef } from "react";

export default function AddImage({
    onChange,
}: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <>
            <button
                type="button"
                className="aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted transition"
                onClick={handleClick}
            >
                <ImagePlusIcon className="size-6" />
                <span className="text-sm">
                    Add Image
                </span>
            </button>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onChange}
                multiple={true}
                className="hidden"
            />
        </>
    );
}