import { useUserManagement } from "../hooks/useUserManagement";
import Greeting from "../components/user/Greeting";
import UserProfile from "../components/user/UserProfile";
import { useSupabase } from "../context/SupabaseContext";
import { useSession } from "../context/SessionContext";
import { Button } from "flowbite-react";
import PostForm from "../components/post/PostForm";

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

    return <>
        <div className='flex flex-col space-y-2 justify-center items-end'>
            <div className={"flex flex-col space-y-2 " + (!session ? 'w-[25rem]' : '')}>
                <h2 className="text-3xl font-serif flex flex-row items-center">
                    <Greeting />
                    <span className='pr-2'>, </span>
                    {user ?
                        <UserProfile
                            signOut={signOut}
                            updateUsername={updateUsername}
                            user={user}
                        />
                        : <div className='text-xl'>
                            <i className="fa-solid fa-circle-notch fa-spin text-blue-500"></i>
                        </div>
                    }
                </h2>
            </div>

            <PostForm />
        </div>
    </>
}