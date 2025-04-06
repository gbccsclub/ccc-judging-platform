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
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <Title />
            {session ? <SignedInView /> : <SignedOutView />}
        </div>
    </>;
}

export default App
