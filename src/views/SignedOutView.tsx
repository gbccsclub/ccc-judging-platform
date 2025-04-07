import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../context/MessageContext";
import SignInForm from "../components/auth/SignInForm";
import { useSupabase } from "../context/SupabaseContext";

interface SignedOutViewProps {
}

export default function SignedOutView({
}: SignedOutViewProps) {
    const { supabase } = useSupabase();
    const { setMessage } = useMessage();
    const { 
        loading, 
        signInWithEmail 
    } = useAuth(supabase, setMessage);

    return <>
        <SignInForm
            loading={loading}
            signInWithEmail={signInWithEmail}
        />
    </>
};
