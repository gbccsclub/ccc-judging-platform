import { Button } from "flowbite-react";
import { AnimatePresence, motion } from "motion/react";

export interface UserSettingControlProps {
    editing: boolean;
    setEditing: (editing: boolean) => void;
    signOut: () => void;
    handleSave: () => void;
    username: string;
    previousUsername: string;
    openPostForm: () => void;
}

export default function UserSettingControl({
    editing,
    setEditing,
    signOut,
    handleSave,
    username,
    previousUsername,
    openPostForm,
}: UserSettingControlProps) {
    return <>
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
                            color='primary'
                            size='xs'
                            className=""
                            onClick={() => openPostForm()}
                        >
                            Create Post
                        </Button>

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
    </>;
}