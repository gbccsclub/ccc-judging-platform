import { useUserManagement } from "../hooks/useUserManagement";
import Greeting from "../components/user/Greeting";
import UserProfile from "../components/user/UserProfile";
import { useSupabase } from "../context/SupabaseContext";
import { useSession } from "../context/SessionContext";
import { motion } from "motion/react";
import PostForm from "../components/post/PostForm";
import { usePostManagement } from "../hooks/usePostManagement";
import PostList from "../components/post/PostList";
import { useState } from "react";

export interface SignedInViewProps {
}

export default function SignedInView({
}: SignedInViewProps) {
    const { session } = useSession();
    const { supabase } = useSupabase();

    const {
        user,
        signOut,
        updateUsername,
    } = useUserManagement(supabase, session);

    const {
        createPost,
        posts,
        loadMore,
        loading,
    } = usePostManagement(supabase, session);

    const [isPostFormOpen, setIsPostFormOpen] = useState(false);

    return <>
        <PostForm
            createPost={createPost}
            isOpen={isPostFormOpen}
            onClose={() => setIsPostFormOpen(false)} />

        <div className='flex flex-col items-center h-full'>
            <div className='mb-8 h-[25vh] mt-[45vh] flex flex-col items-center'>
                <h2 className="text-3xl font-serif flex flex-row items-center">
                    <Greeting />
                    <span className='pr-2'>, </span>
                    {user ?
                        <UserProfile
                            signOut={signOut}
                            updateUsername={updateUsername}
                            user={user}
                            openPostForm={() => setIsPostFormOpen(true)}
                        />
                        : <div className='text-xl'>
                            <i className="fa-solid fa-circle-notch fa-spin text-blue-500"></i>
                        </div>
                    }
                </h2>
            </div>

            <div className="mt-4">
                <PostList
                    loading={loading}
                    posts={posts}
                    loadMore={loadMore}
                />
            </div>
        </div>
    </>
}
