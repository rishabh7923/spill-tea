import {useState } from 'react';
import {useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAddComment from './hooks/useAddComment'
import {
    Field,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import useNavigateToLogin from '@/features/auth/useNavigateToLogin';

function AddComment() {
    const { mutate, status } = useAddComment();
    const { pid } = useParams();
    const [comment, setComment] = useState("");
    const navigateToLogin = useNavigateToLogin();
    function addComment() {
        navigateToLogin();
        if (!comment) return;

        if (comment.trim() === "") {
            toast.error("comment too short");
            return;
        }

        mutate({
            content: comment,
            postId: pid!
        });

        setComment("");
    }

    return (
        <div className='p-2 lg:p-4'>
            <div>
                <Field>
                    <InputGroup>
                        <InputGroupTextarea
                            id="block-end-textarea"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                        />
                        <InputGroupAddon align="block-end">
                            <InputGroupText>{comment.length}/280</InputGroupText>
                            <div className='ml-auto flex gap-2'>
                                <InputGroupButton variant="destructive" size="sm">
                                    Cancel
                                </InputGroupButton>
                                <InputGroupButton variant="default" size="sm" disabled={status === "pending"} onClick={addComment}>
                                    Post
                                </InputGroupButton>
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </div>
        </div>)
}

export default AddComment