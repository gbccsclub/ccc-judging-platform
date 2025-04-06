import { User } from "@supabase/supabase-js";
import DiffusedGradientCircle from "./DiffusedGradientCircle";
import { Button } from "flowbite-react";
import { useState } from "react";

export interface UserProfileProps {
    signOut: () => void;
    updateUsername: (username: string) => void;
    user: User;
}

export default function UserProfile({
    signOut,
    updateUsername,
    user
}: UserProfileProps) {
    const previousUsername = user.user_metadata.name ?? "Nullll User";
    const [username, setUsername] = useState<string>(previousUsername);
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <div
            className="relative"
            onClick={() => setEditing(true)}
        >
            <div className='flex flex-row space-x-2 cursor-pointer group'>
                <input
                    className='text-md text-blue-700 focus:outline-none focus:ring-1 group-hover:text-emerald-500 border border-gray-300 rounded-md px-2 py-0 transition duration-200 ease-in-out min-w-[80px]'
                    onBlur={() => setEditing(false)}
                    style={{
                        width: `${username.length * 1.5}rem`
                    }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <DiffusedGradientCircle
                    radius={18}
                />
            </div>

            {(editing || previousUsername !== username) &&
                <div className="text-md absolute top-10 left-0 pt-1">
                    {previousUsername !== username &&
                        <Button
                            size="xs"
                            color="success"
                            className="font-sans mb-1"
                            onClick={() => {
                                setEditing(false);
                                updateUsername(username);
                            }}
                        >
                            Save
                        </Button>
                    }
                    <Button
                        size="xs"
                        color="failure"
                        className="font-sans"
                        onClick={signOut}
                    >
                        Sign Out
                    </Button>
                </div>
            }
        </div>
    );
};
