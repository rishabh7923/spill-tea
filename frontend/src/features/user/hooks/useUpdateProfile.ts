import { updateProfileApi } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useUpdateProfile() {
    const { isSuccess, data, error, status, mutate: updateProfile } = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: () => {
            toast("Profile updated successfully");
        },
        onError: (e) => {
            toast(e.message);
        }
    })
    return { updateProfile, isSuccess, data, error, status }
}

export default useUpdateProfile