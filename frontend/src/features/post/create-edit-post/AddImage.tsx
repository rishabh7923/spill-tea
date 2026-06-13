import { Button } from "@/components/ui/button";
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
        <div>
            <Button
                variant="outline"
                size="icon-sm"
                type="button"
                onClick={handleClick}
            >
                <ImagePlusIcon />
            </Button>
            {/* <button
                type="button"
                className="w-full h-16 mid:h-24 aspect-square rounded-xl flex items-center p-4 gap-4 md:p-4 md:gap-8 text-muted-foreground hover:bg-muted transition border-1 border-dotted"
                onClick={handleClick}
            >
                <ImagePlusIcon className="size-6" />
                <div className="text-left">
                    <p className="font-medium text-base md:text-lg">Add image</p>
                    <p className="text-xs md:text-base">Click to upload or drag & drop</p>
                </div>
            </button> */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onChange}
                multiple={true}
                className="hidden"
            />

        </div>
    );
}