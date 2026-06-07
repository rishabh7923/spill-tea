import { useRef } from 'react';
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
    const ref = useRef<HTMLTextAreaElement>(null);
    const navigateToLogin = useNavigateToLogin();
    function addComment() {
        navigateToLogin();
        if (!ref.current) return;

        if (ref.current.value.trim() === "") {
            toast.error("comment too short");
            return;
        }

        mutate({
            content: ref.current.value,
            postId: pid!
        });

        ref.current.value = "";
    }

    return (
        <div className='p-2 lg:p-4'>
            <div>
                <Field>
                    <InputGroup>
                        <InputGroupTextarea
                            id="block-end-textarea"
                            placeholder="Write a comment..."
                            ref={ref}
                        />
                        <InputGroupAddon align="block-end">
                            <InputGroupText>0/280</InputGroupText>
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