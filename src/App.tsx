import './App.css'
import { ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import { useSession } from './hooks/useSession'
import Title from './components/Title'
import MessageDialog from './components/MessageDialog'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import { MessageProvider } from './context/MessageContext'
import { SupabaseProvider } from './context/SupabaseContext'

function App() {
    const { session } = useSession();
    return (
        <ThemeProvider theme={customTheme}>
            <SupabaseProvider>
                <MessageProvider>
                    <div className='flex flex-col justify-center items-center h-[90vh]'>
                        <Title isLoggedIn={!!session} />
                        {session ? <SignedInView session={session} /> : <SignedOutView />}
                    </div>
                    <MessageDialog />
                </MessageProvider>
            </SupabaseProvider>
        </ThemeProvider>
    );
}

export default App
