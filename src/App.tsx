import { ThemeProvider } from "flowbite-react"
import { customTheme } from './services/flowbite'
import Title from './components/Title'
import MessageDialog from './components/MessageDialog'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import { MessageProvider } from './context/MessageContext'
import { SupabaseProvider } from './context/SupabaseContext'
import { SessionProvider, useSession } from './context/SessionContext'

function AppContent() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <Title />
            {session ? <SignedInView /> : <SignedOutView />}
        </div>
    </>;
}

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <SupabaseProvider>
                <MessageProvider>
                    <SessionProvider>
                        <AppContent />
                        <MessageDialog />
                    </SessionProvider>
                </MessageProvider>
            </SupabaseProvider>
        </ThemeProvider>
    );
}

export default App
