import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom"

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <h1 className="font-bold text-3xl">404</h1>
            <Button variant="link" onClick={() => navigate("/")}>Go back to home <MoveRight /></Button>
        </div>
    )
}

export default PageNotFound