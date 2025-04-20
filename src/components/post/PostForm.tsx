import { Button } from "flowbite-react";
import { useState } from "react";
import Modal from "../Modal";
import {useMessage} from "../../context/MessageContext.tsx";

export interface PostFormProps {
    isOpen: boolean;
    onClose: () => void;
    createPost: (title: string, description: string, link: string) => void;
}

export default function PostForm({
    isOpen,
    onClose,
    createPost,
}: PostFormProps) {
    const { setMessage } = useMessage();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [p5jsLink, setP5jsLink] = useState("");

    const handleSubmit = () => {
        if (!p5jsLink.includes('/full/')) {
            setMessage({
                type: "error",
                text: (<span>Please enter a valid <strong>Full</strong> P5JS link</span>)
            });
            return;
        }
        createPost(title, description, p5jsLink);
        onClose();
        setTitle("");
        setDescription("");
        setP5jsLink("");
    };

    return <>
        <Modal isOpen={isOpen} >
            <form>
                <h2 className="text-3xl font-serif font-medium text-blue-700 mb-4">
                    Create a new post
                </h2>
                <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of your work"
                    className="text-xs px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
                />

                <label htmlFor="post-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="post-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="(Optional) Detailed description of your work"
                    rows={5}
                    className="text-xs px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
                ></textarea>

                <label htmlFor="p5js-link" className="block text-sm font-medium text-gray-700 mb-1">
                    P5JS Sketch Link (Full)<span className="text-red-500">*</span>
                </label>
                <input
                    id="p5js-link"
                    type="text"
                    value={p5jsLink}
                    onChange={(e) => setP5jsLink(e.target.value)}
                    placeholder="(Share > Full > Copy Link)"
                    className="text-xs px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
                />

                <div className="flex flex-row">
                    <Button color='secondary' size='xs' className="mt-2 mr-2"
                        onClick={onClose}>
                        Cancel
                    </Button>

                    <Button color='primary' size='xs' className="mt-2"
                        onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    </>
}
