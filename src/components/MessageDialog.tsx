import { Alert } from "flowbite-react";
import { Message } from "../types";

export interface MessageProps {
    message: Message | null;
}

export default function MessageDialog({
    message
}: MessageProps) {
    if (!message) return <></>;
    return <>
        <Alert
            className="fixed bottom-4 right-4 z-50"
            color={message.type === 'success' ? 'success' : 'failure'}>
            {message.type === 'success'
                ? <i className="fa-solid fa-circle-check"></i>
                : <i className="fa-solid fa-circle-exclamation"></i>}
            <span> </span>
            {message.text}
        </Alert>
    </>
}