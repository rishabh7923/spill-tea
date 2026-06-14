import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import useAddComment from "./hooks/useAddComment";
import useNavigateToLogin from "@/features/auth/hooks/useNavigateToLogin";

import { Field, FieldError } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";

const CommentSchema = z.object({
    comment: z
        .string()
        .trim()
        .min(1, "Comment is required")
        .max(280, "Comment can't be longer than 280 characters"),
});

type CommentFormData = z.infer<typeof CommentSchema>;

function AddComment() {
    const { mutate, status } = useAddComment();
    const { pid } = useParams();
    const navigateToLogin = useNavigateToLogin();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<CommentFormData>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            comment: "",
        },
    });

    const comment = watch("comment", "");

    function onSubmit(data: CommentFormData) {
        navigateToLogin();

        mutate(
            {
                content: data.comment.trim(),
                postId: pid!,
            },
            {
                onSuccess: () => {
                    reset();
                },
            }
        );
    }

    function handleCancel() {
        reset();
    }

    return (
        <div className="p-2 lg:p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <InputGroup>
                        <InputGroupTextarea
                            placeholder="Write a comment..."
                            {...register("comment")}
                        />

                        <InputGroupAddon align="block-end">
                            <InputGroupText>
                                {comment.length}/280
                            </InputGroupText>

                            <div className="ml-auto flex gap-2">
                                <InputGroupButton
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleCancel}
                                    disabled={comment.length === 0}
                                >
                                    Cancel
                                </InputGroupButton>

                                <InputGroupButton
                                    type="submit"
                                    variant="default"
                                    size="sm"
                                    disabled={status === "pending"}
                                >
                                    {status === "pending"
                                        ? "Posting..."
                                        : "Post"}
                                </InputGroupButton>
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {errors.comment && (
                    <FieldError className="mt-2" errors={[errors.comment]} />
                )}
            </form>
        </div>
    );
}

export default AddComment;