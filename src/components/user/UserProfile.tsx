import { User } from "@supabase/supabase-js";
import DiffusedGradientCircle from "./DiffusedGradientCircle";
import { Button } from "flowbite-react";
import { useState } from "react";
import DownArrow from "../DownArrow";
import { useMessage } from "../../context/MessageContext";
import { AnimatePresence, motion } from "motion/react";

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
    user
}: UserProfileProps) {
    const { setMessage } = useMessage();
    const usernameNotChanged = user.user_metadata.name === null;
    const previousUsername = user.user_metadata.name ?? "Nullll User";
    const [username, setUsername] = useState<string>(previousUsername);
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

            <AnimatePresence initial={false}>
                {(editing || previousUsername !== username) &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="text-md absolute top-8 left-0 py-4 pb-10 w-full flex flex-row justify-between"
                    >
                        <div className='flex flex-col space-y-2'>
                            <AnimatePresence initial={false}>
                                {previousUsername !== username &&
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    >
                                        <Button
                                            size="xs"
                                            color="success"
                                            className="font-sans"
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </motion.div>
                                }
                            </AnimatePresence>

                            <Button
                                size="xs" color="failure"
                                className="font-sans"
                                onClick={signOut}>
                                Sign Out
                            </Button>
                        </div>

                        <Button
                            size="sm" color="transparent"
                            className="font-sans"
                            onClick={() => setEditing(false)} >
                            <i className="fa-solid fa-xmark"></i>
                        </Button>

                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};
