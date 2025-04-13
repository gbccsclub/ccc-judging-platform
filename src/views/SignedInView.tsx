import { useUserManagement } from "../hooks/useUserManagement";
import Greeting from "../components/user/Greeting";
import UserProfile from "../components/user/UserProfile";
import { useSupabase } from "../context/SupabaseContext";
import { useSession } from "../context/SessionContext";
import { motion, AnimatePresence } from "motion/react";
import PostForm from "../components/post/PostForm";
import { usePostManagement } from "../hooks/usePostManagement";
import PostList from "../components/post/PostList";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useRatingManagement } from "../hooks/useRatingManagement";

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

    const {
        updateMyRating,
    } = useRatingManagement(supabase, session);

    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return <>
        <PostForm
            createPost={createPost}
            isOpen={isPostFormOpen}
            onClose={() => setIsPostFormOpen(false)} />

        <div className='flex flex-col items-center h-full'>
            <div className='h-[5vh] mb-[10vh] md:mb-[0vh] mt-[10vh] mb-8 md:h-[25vh] md:mt-[45vh] flex flex-col items-center'>
                <h2 className="text-3xl font-serif flex flex-col md:flex-row items-start">
                    <Greeting />
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
                    updateMyRating={updateMyRating}
                />
            </div>
        </div>

        <div className="fixed bottom-4 right-4 flex flex-col">
            <Button
                color="primary"
                size="sm"
                onClick={() => setIsPostFormOpen(true)}
                className="rounded-full w-12 h-12 flex items-center justify-center mb-2"
            >
                <i className="fa-solid fa-plus"></i>
            </Button>

            <AnimatePresence>
                {showBackToTop && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            color="secondary"
                            size="sm"
                            onClick={scrollToTop}
                            className="rounded-full w-12 h-12 flex items-center justify-center"
                        >
                            <i className="fa-solid fa-arrow-up"></i>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>
}
