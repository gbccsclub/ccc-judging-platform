import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useUserManagement } from "../hooks/useUserManagement";
import Greeting from "../components/user/Greeting";
import UserProfile from "../components/user/UserProfile";

export interface SignedInViewProps {
    supabase: SupabaseClient;
    session: Session;
}

export default function SignedInView({
    supabase,
    session
}: SignedInViewProps) {
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
                        user={session.user}
                    />
                </h2>
            </div>
        </div>
    </>
}