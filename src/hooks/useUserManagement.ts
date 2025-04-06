import { SupabaseClient } from "@supabase/supabase-js"


export const useUserManagement = (supabase: SupabaseClient) => {
    const updateUsername = async (username: string) => {
        await supabase.auth.updateUser({
            data: {
                name: username
            }
        });
    };

    return {
        signOut: () => supabase.auth.signOut(),
        updateUsername,
    }
};