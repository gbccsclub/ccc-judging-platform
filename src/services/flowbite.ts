import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    button: {
        color: {
            primary: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out font-bold",
            secondary: "bg-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out font-bold",
            success: "bg-green-200 text-green-600 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out font-bold",
            failure: "bg-red-200 text-red-600 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out font-bold",
            transparent: "bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 ease-in-out font-bold",
        },
    },
    popover: {
        inner: "bg-gray-200 p-2 rounded-lg border-none",
        base: "rounded-xl border-none",
    },
    alert: {
        color: {
            success: "bg-green-200 text-green-600",
            failure: "bg-red-200 text-red-600",
            info: "bg-gray-200 text-gray-600",
            warning: "bg-orange-200 text-orange-600",
            loading: "bg-gray-200 text-gray-600",
        }
    },
});
