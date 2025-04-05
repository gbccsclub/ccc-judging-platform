import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

export interface Message {
    type: 'success' | 'error';
    text: string;
}

export const useAuth = (
    supabase: SupabaseClient,
    email: string,
) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);

    const signIn = async () => {
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
        message,
        signIn,
    }
};