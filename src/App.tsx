import './App.css'
import { ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import { supabase } from './services/supabaseClient'
import SignIn from './components/SignIn'
import { useSession } from './hooks/useSession'
import Title from './components/Title'
import Welcome from './components/Welcome'

function App() {
    const { session } = useSession(supabase);

    return (
        <ThemeProvider theme={customTheme}>
            <div className='flex flex-col justify-center items-center h-[90vh]'>
                <Title isLoggedIn={!!session} />

                {session
                    ?
                    <div className='flex flex-col space-y-2 justify-center items-end'>
                        <Welcome
                            supabase={supabase}
                            session={session} />
                    </div>
                    :
                    <SignIn supabase={supabase} />
                }
            </div>
        </ThemeProvider>
    );
}

export default App
