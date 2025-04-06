import './App.css'
import { Alert, ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import { supabase } from './services/supabaseClient'
import SignInForm from './components/auth/SignInForm'
import { useSession } from './hooks/useSession'
import Title from './components/Title'
import Greeting from './components/user/Greeting'
import UserProfile from './components/user/UserProfile'
import { useUserManagement } from './hooks/useUserManagement'
import { useAuth } from './hooks/useAuth'
import { useState } from 'react'
import { Message } from './types'
import MessageDialog from './components/MessageDialog'

function App() {
    const { session } = useSession(supabase);
    const [message, setMessage] = useState<Message | null>(null);

    const {
        signOut,
        updateUsername,
    } = useUserManagement(supabase, session);

    const {
        loading,
        signIn,
    } = useAuth(supabase, setMessage);

    return (
        <ThemeProvider theme={customTheme}>
            <div className='flex flex-col justify-center items-center h-[90vh]'>
                <Title isLoggedIn={!!session} />

                {session
                    ?
                    <div className='flex flex-col space-y-2 justify-center items-end'>
                        <div className={"flex flex-col space-y-2 " + (!session ? 'w-[25rem]' : '')}>
                            <h2 className="text-3xl font-serif flex flex-row">
                                <Greeting />
                                <span className='pr-2'>, </span>
                                <UserProfile
                                    signOut={signOut}
                                    updateUsername={updateUsername}
                                    user={session.user}
                                />
                            </h2>
                        </div>
                    </div>
                    :
                    <SignInForm
                        loading={loading}
                        signIn={signIn}
                    />
                }
            </div>

            <MessageDialog
                message={message}
            />
        </ThemeProvider>
    );
}

export default App
