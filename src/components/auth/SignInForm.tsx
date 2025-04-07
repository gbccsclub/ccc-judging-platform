import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useMessage } from '../../context/MessageContext';

export interface SignInProps {
    loading: boolean;
    signInWithEmail: (email: string) => void;
    signInWithGithub: () => void;
}

export default function SignInForm({
    loading,
    signInWithEmail,
    signInWithGithub,
}: SignInProps) {
    const { setMessage } = useMessage();
    const [email, setEmail] = useState('');

    useEffect(() => {
        setMessage({
            type: 'info',
            text: 'We are using One Time Password (OTP) authentication for email sign in. You will receive an email with a login link.'
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
                    onClick={() => signInWithEmail(email)}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Sign In'}
                </Button>

                <p>or</p>

                <Button
                    size="md"
                    color="github"
                    onClick={signInWithGithub}
                    disabled={loading}
                >
                    <i className="fa-brands fa-github mr-2"></i>
                    GitHub
                </Button>
            </div>
        </div>
    );
}
