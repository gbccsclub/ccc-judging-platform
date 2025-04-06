import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Alert, Button } from 'flowbite-react';

export interface SignInProps {
    supabase: SupabaseClient;
}

export default function SignIn({
    supabase
}: SignInProps) {
    const [showOTPInfo, setShowOTPInfo] = useState(true);
    const [email, setEmail] = useState('');
    const {
        loading,
        message,
        signIn,
    } = useAuth(supabase, email);

    return (
        <div className="flex flex-col space-y-2 w-[25rem]">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-row space-x-2 items-center">
                <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="xs px-3 py-2 border border-gray-300 rounded-md flex-1"
                    disabled={loading}
                />

                <Button
                    size="md"
                    color="primary"
                    onClick={signIn}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Sign In'}
                </Button>
            </div>

            {message &&
                <Alert
                    color={message.type === 'success' ? 'success' : 'failure'}>
                    {message.type === 'success'
                        ? <i className="fa-solid fa-circle-check"></i>
                        : <i className="fa-solid fa-circle-exclamation"></i>}
                    <span> </span>
                    {message.text}
                </Alert>}

            {showOTPInfo &&
                <Alert
                    color="light"
                    onDismiss={() => setShowOTPInfo(false)}
                    additionalContent={
                        <p>We are using One Time Password (OTP) authentication. You will receive an email with a login link.</p>
                    }
                >
                    <i className="fa-solid fa-circle-question"></i>
                    <span> </span>
                    Sign in with OTP
                </Alert>
            }
        </div>
    );
}
