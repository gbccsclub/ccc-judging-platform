import './App.css'
import { Button, createTheme, ThemeProvider } from "flowbite-react";

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600 text-white",
      secondary: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className='flex flex-col justify-center items-center h-[90vh]'>
        <p>GBC CS Club</p>
        <h1>Judging App</h1>
        <Button color="primary" size="sm">Custom Button</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
