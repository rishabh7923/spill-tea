import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import useCreateComment from "./hooks/useCreateComment";
import useNavigateToLogin from "@/features/auth/hooks/useNavigateToLogin";

import { Field, FieldError } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { useParams, useSearchParams } from "react-router-dom";
import useCreateReply from "./reply/hooks/useCreateReply";

const CommentSchema = z.object({
    comment: z
        .string()
        .trim()
        .min(1, "Comment is required")
        .max(280, "Comment can't be longer than 280 characters"),
});

type CommentFormData = z.infer<typeof CommentSchema>;
type CreateCommentProps = {
    commentId?: string | number;
    mode: "comment" | "reply"
}

function CreateComment({ mode }: CreateCommentProps) {
    const [searchParams] = useSearchParams();
    const { createComment, commenting } = useCreateComment();
    const { createReply, replying } = useCreateReply();
    const navigateToLogin = useNavigateToLogin();
    const { pid } = useParams();
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

        if (mode === "comment") {
            createComment({ postId: pid!, content: data.comment });
        } else {
            createReply(
                { content: data.comment, postId: pid!, commentId: searchParams.get("replyTo")! },
                {
                    onSuccess: () => reset(),
                },
            );
        }
    }

    function handleCancel() {
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <InputGroup className="rounded-xl">
                        <InputGroupTextarea
                            placeholder="Write a comment..."
                            {...register("comment")}
                        />

                        <InputGroupAddon align="block-end">
                            <InputGroupText>
                                {comment.length}/280
                            </InputGroupText>

                            <div className="ml-auto flex gap-2 md:gap-3">
                                <InputGroupButton
                                    className="rounded-full p-4"
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleCancel}
                                    disabled={comment.length === 0}
                                >
                                    Cancel
                                </InputGroupButton>

                                <InputGroupButton
                                    className="rounded-full p-4"
                                    type="submit"
                                    variant="default"
                                    size="sm"
                                    disabled={commenting === "pending" || replying === "pending"}
                                >
                                    {mode === "comment" ? "Comment" : "Reply"}
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

export default CreateComment;