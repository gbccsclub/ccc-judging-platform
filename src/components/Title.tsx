import { useSession } from "../context/SessionContext";

export interface TitleProps {
}

export default function Title ({
}: TitleProps) {
    const { session } = useSession();
    const isLoggedIn = !!session;
    return <>
        <div className={'flex flex-col justify-start mb-4 ' + (isLoggedIn ? 'relative md:fixed top-0 left-0 p-4 ' : '')}>
            <h1 className={(isLoggedIn ? "text-lg" : "text-3xl") + " text-left font-serif text-gray-700"}>
                Creative Coding Challenge
            </h1>
            <p className={(isLoggedIn ? "text-sm" : "text-lg") + ' text-gray-500'}>
                by GBC CS Club 
                <a 
                    href="https://github.com/gbccsclub/ccc-judging-platform"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                ><i className="fa-brands fa-github text-lg ml-2" /></a>
            </p>
        </div>
    </>
};