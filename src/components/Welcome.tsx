import { Session, SupabaseClient } from "@supabase/supabase-js";
import UserProfile from "./UserProfile";
import Greeting from "./Greeting";
import { useUserManagement } from "../hooks/useUserManagement";

export interface WelcomeProps {
    supabase: SupabaseClient;
    session: Session;
}

export default function Welcome({
    supabase,
    session,
}: WelcomeProps) {
    const {
        signOut,
        updateUsername,
    } = useUserManagement(supabase, session);

    return (
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
    );
};
