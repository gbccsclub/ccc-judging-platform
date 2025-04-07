import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Message } from "../types";

export const useAuth = (
    supabase: SupabaseClient,
    setMessage: (message: Message | null) => void,
) => {
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async (email: string) => {
        if (!email) {
            setMessage({
                type: 'error',
                text: 'Please enter your email address'
            });
            return;
        }

        setLoading(true);
        setMessage({
            type: 'loading',
            text: 'Signing in with GitHub...'
        });

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

    const signInWithGithub = async () => {
        setMessage({
            type: 'loading',
            text: 'Signing in with GitHub...'
        });
        setLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
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
                text: 'Signed in with GitHub!'
            });
        }

        setLoading(false);
    }

    return {
        loading,
        signInWithEmail,
        signInWithGithub,
    }
};