import { useSession } from "../context/SessionContext";

export interface TitleProps {
}

export default function Title ({
}: TitleProps) {
    const { session } = useSession();
    const isLoggedIn = !!session;
    return <>
        <div className={'flex flex-col justify-start mb-4 ' + (isLoggedIn ? 'fixed top-4 left-4' : '')}>
            <h1 className={(isLoggedIn ? "text-lg" : "text-3xl") + " text-left font-serif text-gray-700"}>
                Creative Coding Judging Platform
            </h1>
            <p className={(isLoggedIn ? "text-sm" : "text-lg") + ' text-gray-500'}>
                by GBC CS Club
            </p>
        </div>
    </>
};