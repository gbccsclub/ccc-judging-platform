import { PostWithUser } from "../../types";
import { useEffect, useRef, useState } from "react";

export interface PostCardProps {
    post: PostWithUser;
}

export default function PostCard({
    post,
}: PostCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return <>
        <div ref={cardRef}
            className="flex flex-col space-y-2 w-[25rem] p-4 ">
            <div className='flex flex-row justify-between'>
                <a className="text-3xl font-serif font-medium hover:text-blue-700 transition duration-200 ease-in-out"
                    target="_blank"
                    href={"https://editor.p5js.org/sokmontrey/sketches/" + post.link}
                >
                    {post.title} <i className="fa-solid fa-external-link text-xs text-gray-400"></i>
                </a>
                <div className="flex flex-col items-end">
                    <p>{post.User.username}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>
            {post.description
                ? <p className="text-sm text-gray-500">
                    {post.description}
                </p>
                : <p className="text-sm text-gray-500 italic">
                    No description provided
                </p>
            }
            <br />
            {isVisible && <iframe src={"https://editor.p5js.org/sokmontrey/full/" + post.link} width={"100%"} height={470} />}
        </div >
    </>
}
