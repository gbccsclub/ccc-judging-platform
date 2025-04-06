import './App.css'
import { ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import { supabase } from './services/supabaseClient'
import { useSession } from './hooks/useSession'
import Title from './components/Title'
import { useState } from 'react'
import { Message } from './types'
import MessageDialog from './components/MessageDialog'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'

function App() {
    const { session } = useSession(supabase);
    const [message, setMessage] = useState<Message | null>(null);

    return (
        <ThemeProvider theme={customTheme}>
            <div className='flex flex-col justify-center items-center h-[90vh]'>
                <Title isLoggedIn={!!session} />
                {session
                    ? <SignedInView
                        session={session}
                        supabase={supabase} />
                    : <SignedOutView
                        supabase={supabase}
                        setMessage={setMessage} />}
            </div>

            <MessageDialog
                message={message}
            />
        </ThemeProvider>
    );
}

export default App
