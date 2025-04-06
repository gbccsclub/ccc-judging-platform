import { useEffect, useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { useMessage } from '../../context/MessageContext';

export interface SignInProps {
    loading: boolean;
    signIn: (email: string) => void;
}

export default function SignInForm({
    loading,
    signIn,
}: SignInProps) {
    const { setMessage } = useMessage();
    const [email, setEmail] = useState('');

    useEffect(() => {
        setMessage({
            type: 'info',
            text: 'We are using One Time Password (OTP) authentication. You will receive an email with a login link.'
        });
    }, []);

    return (
        <div className="flex flex-col space-y-2">
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
                    onClick={() => signIn(email)}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Sign In'}
                </Button>
            </div>
        </div>
    );
}
