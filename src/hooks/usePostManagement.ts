import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useMessage } from "../context/MessageContext";
import { NavigatedPost } from "../types";
import { useEffect, useState } from "react";

export const usePostManagement = (
    supabase: SupabaseClient,
    session: Session | null,
    numPostsPerPage: number = 10,
) => {
    const { setMessage } = useMessage();
    const [posts, setPosts] = useState<NavigatedPost[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const createPost = async (title: string, description: string, link: string) => {
        if (!session) return;
        if (!title || !link) {
            setMessage({
                type: "error",
                text: "Please fill in all required fields",
            });
            return;
        }
        if (!link.includes('/full/')) {
            setMessage({
                type: "error",
                text: "Please enter a valid Full P5JS link",
            });
            return;
        }
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
            // Optionally refresh posts after creating a new one
            setPage(1);
            setPosts([]);
            fetchPosts();
        }
    };

    const fetchPosts = async () => {
        if (!session) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('Post')
            .select(`
                *,
                User!inner(*),
                Rating!left(*)
            `)
            // .eq('Rating.rate_user_id', session.user.id)
            .order('created_at', { ascending: false })
            .range((page - 1) * numPostsPerPage, page * numPostsPerPage - 1);

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else if (data) {
            const validPosts = data.filter(post => post.User !== null);

            // Check if we received fewer items than requested
            if (validPosts.length < numPostsPerPage) {
                setHasMore(false);
            }

            // If we're on page 1, replace posts, otherwise append
            if (page === 1) {
                setPosts(validPosts);
            } else {
                setPosts(prevPosts => [...prevPosts, ...validPosts]);
            }
        }
        setLoading(false);
    }

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (!session) return;
        fetchPosts();
    }, [session, page]);

    return {
        posts,
        loading,
        loadMore,
        hasMore,
        createPost,
    }
}

