import { SupabaseClient } from "@supabase/supabase-js"
import { useMessage } from "../context/MessageContext";


export const useUserManagement = (supabase: SupabaseClient) => {
    const { setMessage } = useMessage();

    const updateUsername = async (username: string) => {
        setMessage({
            type: 'loading',
            text: 'Updating username...'
        });

        await supabase.auth.updateUser({
            data: {
                name: username
            }
        });

        setMessage({
            type: 'success',
            text: 'Username updated!'
        });
    };

    const signOut = async () => {
        setMessage({
            type: 'loading',
            text: 'Signing out...'
        });

        await supabase.auth.signOut();

        setMessage({
            type: 'success',
            text: 'Signed out!'
        });
    };

    return {
        signOut,
        updateUsername,
    }
};