import { useUserManagement } from "../hooks/useUserManagement";
import Greeting from "../components/user/Greeting";
import UserProfile from "../components/user/UserProfile";
import { useSupabase } from "../context/SupabaseContext";
import { useSession } from "../context/SessionContext";

export interface SignedInViewProps {
}

export default function SignedInView({
}: SignedInViewProps) {
    const { session } = useSession();
    const { supabase } = useSupabase();

    const {
        signOut,
        updateUsername,
    } = useUserManagement(supabase, session);

    return <>
        <div className='flex flex-col space-y-2 justify-center items-end'>
            <div className={"flex flex-col space-y-2 " + (!session ? 'w-[25rem]' : '')}>
                <h2 className="text-3xl font-serif flex flex-row">
                    <Greeting />
                    <span className='pr-2'>, </span>
                    <UserProfile
                        signOut={signOut}
                        updateUsername={updateUsername}
                        user={session!.user}
                    />
                </h2>
            </div>
        </div>
    </>
}