import DiffusedGradientCircle from "./DiffusedGradientCircle";
import { useState } from "react";
import DownArrow from "../DownArrow";
import { useMessage } from "../../context/MessageContext";
import UserSettingControl from "./UserSettingControl";
import { User } from "../../types";

export interface UserProfileProps {
    signOut: () => void;
    updateUsername: (username: string) => void;
    user: User;
}

function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null;
}

export default function UserProfile({
    signOut,
    updateUsername,
    user,
}: UserProfileProps) {
    const { setMessage } = useMessage();
    const usernameNotChanged = user.username === "Nullll User";
    const [username, setUsername] = useState<string>(user.username);
    const [editing, setEditing] = useState<boolean>(false);

    const handleSave = () => {
        if (isEmptyOrSpaces(username)) {
            setMessage({ type: 'error', text: 'Username cannot be empty' });
        } else {
            updateUsername(username);
        }
    };

    return (
        <div className="relative" >
            <div className='flex flex-row space-x-2 cursor-pointer group'>
                {usernameNotChanged && (
                    <div className="absolute -top-15 left-0 z-10">
                        <div className="relative">
                            <div className="text-sm font-serif italic text-gray-400 transform -rotate-3">
                                update your username
                            </div>
                            <DownArrow />
                        </div>
                    </div>
                )}

                <input
                    className='text-md text-blue-700 focus:outline-none focus:ring-1 group-hover:text-emerald-500 border border-gray-300 rounded-md px-2 py-0 transition duration-200 ease-in-out min-w-[80px]'
                    style={{
                        width: `${username.length * 1.5}rem`
                    }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setEditing(true)}
                />

                <DiffusedGradientCircle
                    onClick={() => setEditing(true)}
                    radius={18}
                />
            </div>

            <UserSettingControl
                editing={editing}
                setEditing={setEditing}
                signOut={signOut}
                handleSave={handleSave}
                username={username}
                previousUsername={user.username}
            />
        </div>
    );
};
