import { createTheme } from "flowbite-react";

export const customTheme = createTheme({
    button: {
        color: {
            primary: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out",
            secondary: "bg-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out",
        },
    },
});