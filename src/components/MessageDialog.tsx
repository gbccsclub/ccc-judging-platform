import { Alert } from "flowbite-react";
import { useMessage } from "../context/MessageContext";

export default function MessageDialog() {
    const { message, setMessage } = useMessage();

    if (!message) return <></>;

    const colorMap = {
        success: 'success',
        error: 'failure',
        info: 'gray',
        warning: 'warning'
    };

    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-circle-exclamation',
        info: 'fa-circle-info',
        warning: 'fa-circle-exclamation'
    };

    return <>
        <Alert
            className="fixed bottom-4 right-4 z-50 flex flex-row"
            color={colorMap[message.type]}>
            <i className={'fa-solid ' + iconMap[message.type]}></i>
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
