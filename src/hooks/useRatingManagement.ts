import { Session, SupabaseClient } from "@supabase/supabase-js";
import { PostWithUser, Rating } from "../types";
import { useEffect, useState } from "react";
import { useMessage } from "../context/MessageContext";

export const useRatingManagement = (
    supabase: SupabaseClient,
    session: Session | null,
    posts: PostWithUser[],
) => {
    const { setMessage } = useMessage();
    const [myRatings, setMyRatings] = useState<Rating[]>([]);

    const fetchMyRatings = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from('Rating')
            .select('*')
            .eq('rate_user_id', session.user.id);

        console.log(data);

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else if (data) {
            setMyRatings(data);
        }
    };

    useEffect(() => {
        if (!session) return;

        // TODO: retrieve my ratings
        // fetchMyRatings();
    }, [session, posts]);

    return {
        myRatings,
    }
};