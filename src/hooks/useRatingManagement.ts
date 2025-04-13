import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useMessage } from "../context/MessageContext";

export const useRatingManagement = (
    supabase: SupabaseClient,
    session: Session | null,
) => {
    const { setMessage } = useMessage();

    const updateMyRating = async (postId: number, aesthetic: number, originality: number) => {
        if (!session) return;
        setMessage({ type: 'loading', text: 'Updating rating...' });

        // Check if the user has already rated this post
        const { data, error } = await supabase
            .from('Rating')
            .select('*')
            .eq('post_id', postId)
            .eq('rate_user_id', session.user.id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
            setMessage({ type: 'error', text: error.message });
            return;
        }

        if (data) { // Update existing rating
            const { error: updateError } = await supabase
                .from('Rating')
                .update({ aesthetic, originality })
                .eq('id', data.id);
                
            if (updateError) {
                setMessage({ type: 'error', text: updateError.message });
            } else {
                setMessage({ type: 'success', text: 'Rating updated!' });
            }
        } else { // Create new rating
            const { error: insertError } = await supabase
                .from('Rating')
                .insert({
                    post_id: postId,
                    rate_user_id: session.user.id,
                    aesthetic,
                    originality,
                });
                
            if (insertError) {
                setMessage({ type: 'error', text: insertError.message });
            } else {
                setMessage({ type: 'success', text: 'Rating created!' });
            }
        }
    };

    return {
        updateMyRating,
    }
};
