import './App.css'
import { ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import { supabase } from './services/supabaseClient'
import SignIn from './components/SignIn'
import { useSession } from './hooks/useSession'
import { SignOut } from './components/SignOut'

function App() {
    const { session } = useSession(supabase);

    return (
        <ThemeProvider theme={customTheme}>
            <div className='flex flex-col justify-center items-center h-[90vh]'>
                <p>GBC CS Club</p>
                <h1 className="text-2xl font-bold mb-4">Creative Coding Judging Platform</h1>

                {session
                    ? <SignOut supabase={supabase} />
                    : <SignIn supabase={supabase} />}
            </div>
        </ThemeProvider>
    );
}

export default App
