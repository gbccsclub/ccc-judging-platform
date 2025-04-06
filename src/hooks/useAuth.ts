import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Message } from "../types";

export const useAuth = (
    supabase: SupabaseClient,
    setMessage: (message: Message | null) => void,
) => {
    const [loading, setLoading] = useState(false);

    const signIn = async (email: string) => {
        if (!email) {
            setMessage({
                type: 'error',
                text: 'Please enter your email address'
            });
            return;
        }

        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithOtp({
            email
        });

        if (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error
                    ? error.message :
                    'An error occurred during sign in'
            });
        } else {
            setMessage({
                type: 'success',
                text: 'Check your email for the login link!'
            });
        }

        setLoading(false);
    };

    return {
        loading,
        signIn,
    }
};