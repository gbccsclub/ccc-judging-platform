import { User } from "@supabase/supabase-js";
import DiffusedGradientCircle from "./DiffusedGradientCircle";
import { Tooltip } from "flowbite-react";

export interface UserProfileProps {
    user: User;
}

export default function UserProfile({
    user
}: UserProfileProps) {
    return (<button className='flex flex-row space-x-2 cursor-pointer group'>
        {user.user_metadata.name ??
            <Tooltip
                style="light"
                content={<p className='font-sans'>
                    We added 4 <strong>L</strong>s so it looks intentional
                </p>}
            >
                <span className="text-blue-700 group-hover:text-red-700 transition duration-200 ease-in-out" > Nullll User </span>
            </Tooltip>
        }
        <DiffusedGradientCircle
            radius={18}
        />
    </button>);
};