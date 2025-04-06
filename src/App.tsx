import Title from './components/Title'
import SignedInView from './views/SignedInView'
import SignedOutView from './views/SignedOutView'
import { useSession } from './context/SessionContext'

function App() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>
        <Title />
        {session ? <SignedInView /> : <SignedOutView />}
    </>;
}

export default App
