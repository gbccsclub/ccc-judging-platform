import { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "../hooks/useAuth";
import SignInForm from "../components/auth/SignInForm";

export interface SignedOutViewProps {
    supabase: SupabaseClient;
    setMessage: (message: any) => void;
}

export default function SignedOutView({
    supabase,
    setMessage,
}: SignedOutViewProps) {
    const {
        loading,
        signIn,
    } = useAuth(supabase, setMessage);

    return <>
        <SignInForm
            loading={loading}
            signIn={signIn}
        />
    </>
};