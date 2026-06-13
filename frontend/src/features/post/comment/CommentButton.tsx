import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

function CommentButton({ onClick }: { onClick: () => void }) {
    return (
        <Button variant="ghost" size="icon" className="transition-all hover:text-blue-500 rounded-full hover:bg-blue-100" onClick={onClick}>
            <MessageCircle className="h-4 w-4" />
        </Button>
    )
}



export default CommentButton