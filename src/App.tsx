import Title from './components/Title'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import { useSession } from './context/SessionContext'

function App() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (session) {
        return <>
            <Title />
            <SignedInView />
        </>;
    } else {
        return <div className="flex flex-col justify-center h-screen items-center">
            <Title />
            <SignedOutView />
        </div>
    }
}

export default App
