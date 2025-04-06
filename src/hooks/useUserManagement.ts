import { Session, SupabaseClient } from "@supabase/supabase-js"
import { useMessage } from "../context/MessageContext";
import { useEffect, useState } from "react";
import { User } from "../types";

export const useUserManagement = (
    supabase: SupabaseClient,
    session: Session | null,
) => {
    const [user, setUser] = useState<User | null>(null);
    const { setMessage } = useMessage();

    const createUserIfNotExists = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from("User")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();

        if (error) {
            setMessage({ type: 'error', text: error.message });
            return;
        }

        if (!data) { // User does not exist, create it
            await supabase.from("User").insert({ id: user.id });
        }
    };

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from("User")
            .select("id, username, created_at")
            .eq("id", user.id)
            .single();

        if (error) {
            setMessage({ type: 'error', text: error.message });
            return;
        }

        if (data && !error) setUser(data); 
    };

    const updateUsername = async (username: string) => {
        setMessage({ type: 'loading', text: 'Updating username...' });

        const { error } = await supabase
            .from("User")
            .update({ username })
            .eq("id", user?.id)
            .single();

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            await getUser();
            setMessage({ type: 'success', text: 'Username updated!' });
        }
    };

    const signOut = async () => {
        setMessage({ type: 'loading', text: 'Signing out...' });

        await supabase.auth.signOut();

        setMessage({ type: 'success', text: 'Signed out!' });
    };

    const getUserPipeline = async () => {
        await createUserIfNotExists();
        await getUser();
    };

    useEffect(() => {
        if (!session) return;
        getUserPipeline();
    }, [session]);

    return {
        user,
        signOut,
        updateUsername,
    }
};