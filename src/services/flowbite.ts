import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    button: {
        color: {
            primary: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out",
            secondary: "bg-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out",
            success: "bg-green-200 text-green-600 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out",
            failure: "bg-red-200 text-red-600 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out",
        },
    },
    popover: {
        inner: "bg-gray-200 p-2 rounded-lg border-none",
        base: "rounded-xl border-none",
    }
});
