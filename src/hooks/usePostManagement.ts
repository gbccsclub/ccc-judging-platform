import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useMessage } from "../context/MessageContext";

export const usePostManagement = (
    supabase: SupabaseClient,
    session: Session | null,
) => {
    const { setMessage } = useMessage();

    const createPost = async (title: string, description: string, link: string) => {
        if (!session) return;

        setMessage({ type: 'loading', text: 'Creating post...' });

        const { error } = await supabase
            .from("Post")
            .insert({
                title,
                description,
                link,
                user_id: session.user.id,
            });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Post created!' });
        }
    };

    return {
        createPost,
    }
}