import { Session } from "@supabase/supabase-js";
import UserProfile from "./UserProfile";
import Greeting from "./Greeting";

export interface WelcomeProps {
    session: Session;
}

export default function Welcome ({
    session
}: WelcomeProps) {
    return (
        <div className={"flex flex-col space-y-2 " + (!session ? 'w-[25rem]' : '')}>
            <h2 className="text-3xl font-serif flex flex-row">
                <Greeting /> 
                <span className='pr-2'>, </span> 
                <UserProfile user={session.user} />
            </h2>
        </div>
    );
};
