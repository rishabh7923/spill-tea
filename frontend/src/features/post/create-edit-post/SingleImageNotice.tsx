import { Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SingleImageNotice() {
    return (
        <Alert className="border-blue-200 bg-blue-50 text-blue-900">
            <Info className="h-4 w-4 text-blue-600!" />

            <AlertDescription className="text-blue-700 ">
                <div>
                    Due to limited resources, only the{" "}
                    <span className="font-semibold">first selected image</span> will be
                    uploaded. Any additional images will be ignored.
                </div>
            </AlertDescription>
        </Alert>
    )
}