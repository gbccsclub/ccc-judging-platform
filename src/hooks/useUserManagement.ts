import { SupabaseClient } from "@supabase/supabase-js"


export const useUserManagement = (supabase: SupabaseClient) => {
    const updateUsername = async (username: string) => {
        await supabase.auth.updateUser({
            data: {
                name: username
            }
        });
    };

    const signOut = async () => {
        console.log("Signing out...")
        await supabase.auth.signOut();
    };

    return {
        signOut,
        updateUsername,
    }
};