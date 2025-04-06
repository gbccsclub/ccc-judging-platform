import { Button } from "flowbite-react";
import { useState } from "react";
import Modal from "../Modal";

export interface PostFormProps {
}

export default function PostForm({
}: PostFormProps) {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Create Post"
        >
            <div>
                Hello world
            </div>
        </Modal>

        <Button
            color='primary'
            size='xs'
            className="fixed bottom-4 right-4"
            onClick={() => setIsOpen(true)}
        >
            Create Post
        </Button>
    </>
}
