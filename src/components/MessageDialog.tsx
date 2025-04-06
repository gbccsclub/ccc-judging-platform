import { Alert, Button } from "flowbite-react";
import { useMessage } from "../context/MessageContext";

export default function MessageDialog() {
    const { message, setMessage } = useMessage();

    if (!message) return <></>;
    return <>
        <Alert
            className="fixed bottom-4 right-4 z-50 flex flex-row"
            color={message.type === 'success' ? 'success' : 'failure'}>
            {message.type === 'success'
                ? <i className="fa-solid fa-circle-check"></i>
                : <i className="fa-solid fa-circle-exclamation"></i>}
            <span> </span>
            {message.text}

            <button
                className='p-2 hover:-translate-y-0.5 active:translate-y-0 hover:text-blue-500 transition duration-200 ease-in-out cursor-pointer'
                onClick={() => setMessage(null)}
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
        </Alert>
    </>
}
